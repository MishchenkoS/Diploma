import React, { useContext, useCallback, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useHttp } from "../hooks/httpHooks";
import { Loader } from "../components/Loader";

export const TournamentInfo = ({tournament}) => {
  console.log("tournament",tournament);
  const {token, role} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [game, setGame] = useState(null);


  const [rounds, setRounds] = useState([...tournament.rounds]);
  // console.log(rounds)
 
  const [result, setResult] = useState([]);
  const [responders, setResponders] = useState([]);
  const [answers, setAnswers] = useState({});
  console.log(result)
  // const [answers, setAnswers] = useState([]);
  // const [tests, setTests] = useState([]);
  // const arr = []


  const getGame = useCallback ( async (id) => {
    try {
      if(role==="ADMIN") {
        const fetched = await request(`/api/games/game/${id}`, "GET", null, {
          Authorization: `Bearer ${token}`
        });
    
        setGame(fetched.game);
      } else {
        const fetched = await request(`/api/games/myGames/${id}`, "GET", null, {
          Authorization: `Bearer ${token}`
        });
        setGame(fetched.game);
      }

      
    } catch(error) {
    }
  }, [token, request]);

  const getUser = useCallback (async (id, index, item, i) => {
    try {
      const fetched = await request(`/api/users/me/admin/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      // const user = fetched.user;
      // setResponders((resp)=>{
      //   console.log(fetched.user)
      //   resp = [...resp, fetched.user];
      //   console.log("setresp", resp)
      //   return resp;
      // });

      // console.log("get responders", responders, index)

      // setAnswers((answers) => {
      //   const obj = {...answers};
      //   console.log(item.answers[id])
      //   obj[fetched.user.login] = item.answers[id];
      //   console.log(obj)
      //   return obj;
      // })
      console.log(i, index, id, item)
      console.log(result);
      setResult((res) => {
        console.log("set result")
          // const obj = [...result];
          console.log(res);
          if("responders" in res[i][index]) {
            console.log("if")
            res[i][index].responders = [...res[i][index].responders, fetched.user];
          } else {
            res[i][index].responders = [fetched.user];
          }
          if("answers" in res[i][index]) {
            res[i][index].answers = {...res[i][index].answers, [fetched.user.login]: item.answers[id]};
          } else {
            res[i][index].answers = {[fetched.user.login]: item.answers[id]};
          }
          return res;
      })

      // console.log(answers)
      console.log(result)
      
    } catch (error) {
    }
  }, [token, request]);



  const getTest = useCallback (async (id, index, i) => {
    try {
      const fetched = await request(`/api/tests/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      
      setResult((result)=>{
        result[i][index].test = fetched.test;
      });

      console.log("getTest",result)

    } catch (error) {
    }
  }, [token, request]);


  // rounds.map((round) => {
  //   setResult((result)=>[...result, []])
  //   round.map((item, index) => {
  //     setResponders([]);
  //     // setAnswers(()=>{return {}});
  //     getTest(item.testId, index);
  //     item.responders.map((responder)=>{
  //       getUser(responder, index, item);
  //     });

  //     setResult((result)=>{
  //       const obj = [...result];
  //       obj[index].status = item.status;
  //       obj[index].responders = [...responders];
  //       obj[index].answers = {...answers};
  //       return obj;
  //     });

  //   });
  // });

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

  // useEffect(()=>{
    // rounds.map((round) => {
    //   console.log(1)
    //   setResult((result)=>[...result, []])
    //   round.map((item, index) => {
    //     console.log(2)
    //     setResponders([]);
    //     console.log("item",item)
    //     // setAnswers(()=>{return {}});
    //     getTest(item.testId, index);
    //     console.log("result",result)
    //     // item.responders.map((responder)=>{
    //     //   getUser(responder, index, item);
    //     // });
        
    //     // setResult((result)=>{
    //     //   const obj = [...result];
    //     //   console.log(obj)
    //     //   obj[index].status = item.status;
    //     //   obj[index].responders = [...responders];
    //     //   obj[index].answers = {...answers};

    //     //   return obj;
    //     // });
  
    //   });
    // });
  // }, [tournament])


  useEffect(async () => {
    getGame(tournament.gameId);


    // console.log("до мапа", rounds)


    rounds.map((round,i) => {
      console.log("i",i)
      setResult((result)=>{
        const obj = [...result, []]
        // result.push([]);
        // return result;
        return obj
      })
      console.log("result push", result)
      round.map(async (item, index) => {
        console.log("index",index);
        setResult((result)=>{
          result[i].push({});
          return result;
        })
        console.log("result push {}", result)
        // setResponders((resp)=>{return []});
        // console.log("resp",responders);
        // setAnswers(()=>{return {}});


        item.responders.map(async (responder)=>{
          getUser(responder, index, item, i);
        });

        getTest(item.testId, index, i);
        // console.log("result",result)



        // setResult((result)=>{
        //   console.log("status",item.status);
        //   console.log(index)
        //   const obj = [...result];
        //   console.log("obj", obj)
        //   obj[index].status = item.status;
        //   obj[index].responders = [...responders];
        //   obj[index].answers = {...answers};
        //   return obj;
        // });
  
      });
    });




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
  }, [getGame]);

  // console.log(game)
  // console.log(arr)
  // console.log(responders)
  if(loading || !game ) {
    return <Loader></Loader>
  }


  console.log(result)


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