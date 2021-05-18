import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { Loader } from "../components/Loader";

export const TournamentInfo = ({tournament}) => {
  console.log("tournament",tournament);
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [game, setGame] = useState(null);
  // const [responders, setResponders] = useState([[]]);
  // const [answers, setAnswers] = useState([]);
  // const [tests, setTests] = useState([]);
  // const arr = []


  const getGame = useCallback ( async (id) => {
    try {

      const fetched = await request(`/api/games/game/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
  
      setGame(fetched.game);
      
    } catch(error) {

    }
  }, [token, request]);

  // const getAnswers = useCallback(async(id) => {

  // })

  // const getTests = useCallback(async(id, index) => {
  //   try {

  //     const fetched = await request(`/api/tests/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  
  //     // arr[index].push(fetched);
  //     // setTests(tests[index].push(fetched.test));
      
  //   } catch(error) {

  //   }
  // })
  // tournament.rounds.map((round)=>{
  //   round.map((item)=>{
          // getTests(item.testId)
  //   })
  // })
  

  // const getResponder = useCallback ( async (id) => {
  //   try{
  //     const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     setResponders([[...responders, fetched.user]]);
  //   } catch(e) {

  //   }
  // }, [token, request]);

  // tournament.rounds.map((round)=>{
  //   round.map((item)=>{
  //     item.responders.map(()=>{
  //       
  //     });
  //   })
  // })

  useEffect(() => {
    getGame(tournament.gameId);
    // tournament.rounds.map((round)=>{
    //   arr.push([])
      // setTests(tests.push([]))
    //   round.map((item, index)=>{
    //         getTests(item.testId, index)
    //   })
    // })


    // tournament.rounds.map((round)=>{
    //   round.map((item)=>{
    //     item.responders.map(()=>{
          
    //     });
    //   })
    // })
  }, [getGame])

  console.log(game)
  // console.log(arr)
  // console.log(responders)
  if(loading || !game) {
    return <Loader></Loader>
  }

  return (
  <>
  <p>Hello</p>
  <p>Статус: {tournament.status}</p>
  <Link to={`/games/game/${game._id}`}>{game.nameGame}</Link>
  </>
  )


}

// export const TournamentInfo = ({ tournament }) => {
//   // console.log(tournament)
//   const {token} = useContext(AuthContext);
//   const {request, loading} = useHttp();
//   const [game, setGame] = useState(null);
//   const [rounds, setRounds] = useState([]);
//   const [responders, setResponders] = useState([]);

 

//   const getGame = useCallback ( async (id) => {
//     try {

//       const fetched = await request(`/api/games/game/${id}`, "GET", null, {
//         Authorization: `Bearer ${token}`
//       });
  
//       setGame(fetched.game);
      
//     } catch(error) {

//     }
//   }, [token, request]);

//   const getResponder = useCallback(async(id) => {
//     console.log('getResponder')
//     const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
//       Authorization: `Bearer ${token}`
//     });
//     console.log(fetched)
//     setResponders([...responders, fetched.user.login])
//   }, [token, request]);

//   const getRounds = useCallback(async (testId, respondersRound, answers) => {
//     try {
//       // setResponders([]);
//       const test = await request(`/api/tests/${testId}`, "GET", null, {
//         Authorization: `Bearer ${token}`
//       });

//       console.log("testId", testId)
//       console.log('responders', respondersRound);
//       respondersRound.map(async (item) => {
//         console.log('respondersRound.map')
//         await getResponder(item);
//       });

//       console.log("resName",responders)

//       const obj = { };

//       for(let key in answers){
//         const index = responders.indexOf(key);
//         const name = responders[index]
//         obj[name] = answers[key];
//       }

//       const object = {
//         test: test.test,
//         responders,
//         answers: obj
//       }

//       setRounds([...rounds, object]);
//       console.log(rounds)
      
//     } catch(error) {

//     }
//   }, [token, request, getResponder]);

//   useEffect(() => {
//     getGame(tournament.gameId);

//     tournament.rounds.map((item1) => {
//       item1.map((item2) => {
//         // setResponders([]);
//         getRounds(item2.testId, item2.responders, item2.answers)
//       })
//     })

//   }, [getGame, getRounds, getResponder]);

  
//   if(loading || !game || responders.length === 0) {
//     return <Loader></Loader>
//   }


//   return (
//     <>
//       <h2>Турнир</h2>
//       <p>Статус: {tournament.status}</p>
//       <p>Название игры: {game.nameGame}</p>
      




//       {/* <h2>Тест</h2>
  
//       <p>Сложность: {tournament.complexity}</p>
//       <p>Тип: {tournament.type}</p>
//       <p>Вопрос: {tournament.question}</p>
//       {tournament.img_question &&
//       <img src={`${tournament.img_question}`}></img>
//       }

      


//       <p>Варианты ответа: 
//         {test.answers.map((item, index) => {
//           if(test.true_answer.includes(item)) {
//             return (
//             <li key={`${index}`}>
//               {test.img_answers[index] && 
//               <img src={`${test.img_answers[index]}`}></img>}
//               <b>{item}</b>
//             </li>
//           );}
//           return (
//             <li key={`${index}`}>
//               {test.img_answers[index] && 
//               <img src={`${test.img_answers[index]}`}></img>}
//               {item}
//             </li>
//           );
//         })}
//       </p> */}
//       {/* <p>Дата создания: <strong>{new Date(test.created_date).toLocaleDateString()}</strong></p> */}
//     </>
//   );
  
// }