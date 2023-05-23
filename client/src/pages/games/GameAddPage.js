import React, { useState, useEffect, useContext, useCallback  } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { useMessage } from "../../hooks/messageHook";
import { useHttp } from "../../hooks/httpHooks";
import { Loader } from "../../components/Loader";
import { GamePlayersAll } from "../../components/games/GamePlayersAll";
import { GameTeams } from "../../components/games/GameTeams";
import { GameLeadingsAll } from "../../components/games/GameLeadings";
import { GameTestsAdd } from "../../components/games/GameTestsAdd";

export const GameAddPage = (formArg) => {
  const {token} = useContext(AuthContext);
  const {loading, error, request, clearError} = useHttp();
  const message = useMessage();
  const [type, setType] = useState(null);
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [countRounds, setCountRounds] = useState([]);
  const gameId = useParams().gameId;
  let [form, setForm] = useState({
    nameGame: "",
    leadings: [],
    players: [],
    type: "",
    rounds: []
  });

  if(formArg.ok) {
    form = formArg.form;
    setForm = formArg.setForm;
  }

  useEffect(()=>{
    
    if(formArg.ok) {
      form = formArg.form;
      setForm = formArg.setForm;
      setType(formArg.form.type);
      setCountRounds(() => {
        const cv = [];
        form.rounds.forEach((item, index)=>{
          cv.push(index);
        });
        return cv;
      })
    }

  }, [formArg])

  const getUsers = useCallback ( async () => {
    try {
      const fetched = await request('/api/users/me/admin', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setUsers(fetched);
      
    } catch(error) {

    }
  }, [token, request]);

  const getTests = useCallback ( async () => {
    try {
      const fetched = await request('/api/tests/', "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setTests(fetched);
      
    } catch(error) {

    }
  }, [token, request]);

  useEffect(() => {
    var select = document.querySelectorAll('select');
    var instances = window.M.FormSelect.init(select, {});
  }, [!loading]);

  useEffect(() => {
    getUsers();
    getTests();
  }, [getUsers, getTests]);

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  if(loading) {
    return <Loader></Loader>
  }

  const changeNameGame = (event) => {
    setForm(form=> ({
      ...form,
      [event.target.name]: event.target.value, 
    }));
  }

  const changeTypeGame = (event) => {
    setForm(form=>({
      ...form,
      players : [],
      [event.target.name]: event.target.value, 
    }));
    setType(event.target.value);
  }

  const addRound = (event) => {
    setForm((form) => ({
      ...form, rounds: [...form.rounds, {}]
    }));
    setCountRounds([...countRounds, countRounds.length]);
  }

  const clearRound = (event) => {
    setForm((form)=>{
      const rounds = [...form.rounds];
      rounds.splice(+event.target.name, 1);
      return {...form, rounds}
    });
    setCountRounds((countRounds)=>{
      const count_rounds = [...countRounds];
      count_rounds.splice(+event.target.name, 1);
      return count_rounds;
    })
  }

  const gameAdd = async () => {
    try {

      let flag = true;
      for(let i = 0; i < form.rounds; i++) {
        if(!Object.keys(form.rounds[i]).length) {
          flag = false;
          break;
        }
      }

      if(form.leadings.length &&
        form.players.length 
        && form.rounds.length && flag ) {
          const data = await request('/api/games/game', 'POST', {...form}, {
            Authorization: `Bearer ${token}`
          });
          message(data.message);
          window.location.href = '/games';
      } else {
        message("Не всі поля заповнені");
      }

    } catch(error) {
    }
  }

  const gameChange = async () => {
    try {

      let flag = true;
      for(let i = 0; i < form.rounds; i++) {
        if(!Object.keys(form.rounds[i]).length) {
          flag = false;
          break;
        }
      }
      if(form.leadings.length &&
        form.players.length 
        && form.rounds.length && flag ) {
          const data = await request(`/api/games/changeGame/${gameId}`, 'PATCH', {...form}, {
            Authorization: `Bearer ${token}`
          });
          message(data.message);
      } else {
        message("Не всі поля заповнені");
      }
      window.location.href = `/games/game/${gameId}`;
    } catch(error) {
    }
  }

  return (
    <div>
      <div>
        {formArg.ok && <h5>Редагувати гру</h5>}
        {!formArg.ok && <h5>Створити нову гру</h5>}
      </div>
      <form action="" onSubmit={e => { e.preventDefault(); }}>
      <div>
      <label>Введіть назву гри</label>
      <input 
          type='text' 
          name='nameGame'
          placeholder='Назва гри'
          value={form.nameGame}
          onChange={changeNameGame}
          autoComplete='off'
          required
        />
        </div>
        <div className="col s12 darken-1">
        <label>Оберіть тип гри</label>
        <select name="type" onChange={changeTypeGame} defaultValue={form.type} required>
          <option value="" disabled selected>---</option>
          <option value="PLAYER">Гравці</option>
          <option value="TEAM">Команди</option>
        </select>
        </div>
        {type==="PLAYER" && <GamePlayersAll formArg={form} setFormArg={setForm} users={users}></GamePlayersAll>}
        {type==="TEAM" && <GameTeams formArg={form} setFormArg={setForm} users={users}></GameTeams>}
        <div>
          <GameLeadingsAll formArg={form} setFormArg={setForm} users={users}></GameLeadingsAll>
        </div>
        <div>
          <div className='div-btn'><h6>Наповнити гру тестами</h6></div>
          <div className='div-btn'><button 
          name='rounds' 
          onClick={addRound}
          className="btn waves-effect waves-light indigo lighten-1 btn-add"
          >Створити раунд <i class="material-icons right">add</i>
          </button></div>
          {countRounds.map((item, index) => {
            return (
            <>
              <p>{`Раунд ${index + 1}`}<i className="material-icons right">
                <a href='#' className='a-clear' name={index} onClick={clearRound}>clear</a>
              </i></p>  
              
              <GameTestsAdd tests={tests} formArg={form} setFormArg={setForm} round={index}></GameTestsAdd>
            </>
            );
          })}
        </div>
        {formArg.ok && <div className='div-btn'><button  
        type='submit' 
        onClick={gameChange} 
        className="btn waves-effect waves-light indigo lighten-1 btn-add"
        >Редагувати гру<i class="material-icons right">send</i></button></div>}
        {!formArg.ok && <div className='div-btn'><button  
        type='submit' 
        onClick={gameAdd} 
        className="btn waves-effect waves-light indigo lighten-1 btn-add"
        >Створити гру<i class="material-icons right">send</i></button></div>}
        </form>
    </div>
  );
}