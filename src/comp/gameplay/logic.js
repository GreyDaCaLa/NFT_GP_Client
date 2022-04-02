import { useEffect, useRef } from "react";


// export default function take_one_action(
//   attackers,
//   setAttackers,
//   defenders,
//   setDefenders,
//   arrsize
// ) {
//   console.log("\n\n\n\n", "moving once-\n");

//   console.log(attackers);
//   let newA = {};
//   for (let key of Object.keys(attackers)) {
//     let temp = Number(key);
//     newA[temp - 1] = attackers[temp];
//   }
//   // console.log
//   setAttackers(newA);
//   return "great";
// }

//is character dead in current object array
export function is_dead(person, fighters) {
  if(fighters[person]){
    return fighters[person].stats.hp <= 0;
  }
  return true;
}

//find closest enemy
export function findclosest(me, att_arr, def_arr, fighters) {
  let min = Infinity;
  let closest = "";

  let enemyArr = att_arr;
  if (me.includes("A")) {
    enemyArr = def_arr;
  }

  for (let enemy of enemyArr) {
    if (!is_dead(enemy,fighters)) {
      let dist =
        ((fighters[enemy].x - fighters[me].x) ** 2 +
          (fighters[enemy].y - fighters[me].y) ** 2) **
        0.5;

      if (min > dist) {
        min = dist;
        closest = enemy;
      }
    }
  }

  return [closest, min];
}

//move towards enemy
export function changePos(me, enemy, dt, fighters) {
  //change x
  if (!fighters[enemy] || is_dead(enemy,fighters)) {
    console.log("the enemy was dead, moving on");
    return fighters
  }
  
  //move left or right
  let xres = fighters[enemy].x - fighters[me].x;
  //move up or down
  let yres = fighters[enemy].y - fighters[me].y;
  
  if (Math.abs(xres) < dt * 0.01) {xres = 0;} // if its close to zero make it zero
  if (Math.abs(yres) < dt * 0.01) { yres = 0;} // if its close to zero make it zero
  
  if (xres > 0) {
    fighters[me].x = fighters[me].x + dt * 0.01 * fighters[me].stats.spd;
  } else if (xres < 0) {
    fighters[me].x = fighters[me].x - dt * 0.01 * fighters[me].stats.spd;
  }
  // change y
  if (yres > 0) {
    fighters[me].y = fighters[me].y + dt * 0.01 * fighters[me].stats.spd;
  } else if (yres < 0) {
    fighters[me].y = fighters[me].y - dt * 0.01 * fighters[me].stats.spd;
  }
  
  return fighters;
  
}

//charge attack and damage enemy
export function attackEnemy(me, enemy, dt, fighters) {
  if (!fighters[enemy]) {
    console.log("the enemy was dead, moving on");
    return fighters;
  }

  //charge your attack
  fighters[me].stats.chgR = fighters[me].stats.chgR + dt;

  //if charge rate reaches charge limit do damage
  // also reset charge rate
  if (fighters[me].stats.chgR >= fighters[me].stats.chgL) {
    fighters[me].stats.chgR = 0;
    fighters[enemy].stats.hp -= 
      strikenum(fighters[me].stats.atk,fighters[me].stats.lck)
  }
  return fighters
}


//calculat actual attack based on luck, chance, and base attack
export function strikenum(atk, lck) {
  let weight = [0, 0.22, 0.44, 0.6, 0.72, 0.82, 0.9, 0.96, 1, 1, 1];

  let rand = Math.random();
  let chance = weight.findIndex((ele) =>
    {
      return ele > rand;
    }) - 1;

  let actual = atk / 2 + atk * 2 * (0.1 * chance);

  return actual;
}


export function takeaction(tS,dt, fighters, allCharacters,att_arr,def_arr) {
  // console.log("\n taking action");

  console.log("\n");
  for (let ele of allCharacters) {
    console.log(
      `I (${ele}) hp:${fighters[ele].stats.hp} | chgR:${fighters[ele].stats.chgR}`
    );

    //clean up/ skip the dead
    if (fighters[ele].stats.hp > 0) {
      //#######find closest
      let closest, dist;
      [closest, dist] = findclosest(ele, att_arr, def_arr, fighters);
      console.log(`----The closest is ${closest} he is ${dist}`);

      //########## choose between move or attack
      if (dist > fighters[ele].stats.rng * tS) {
        // if move
        fighters=changePos(ele, closest, dt, fighters);
      } else {
        // if attack
        fighters=attackEnemy(ele, closest, dt, fighters);
      }

    } else {
      console.log("deleting ", ele);
      delete fighters[ele];
      // delete fighters[ele]
      console.log("i am", fighters[ele]);
    }

    
  }

  return fighters;
}



//the main animation loop
export const useAnimationFrame = (callback) => {
  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = useRef();
  const previousTimeRef = useRef();

  const animate = (time) => {
    if (previousTimeRef.current != undefined) {
      const deltaTime = time - previousTimeRef.current;
      callback(deltaTime);
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once
};
