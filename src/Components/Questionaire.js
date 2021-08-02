import React, { useState, useEffect } from "react";
import { Progress, Modal, ModalBody, CardBody, Card } from "reactstrap";



export default function Questionaire({ questions, retake }) {

  /// hooks for local state management
  const [id, setId] = useState(null);
  const [value, setValue] = useState(null);
  const [counter, setCounter] = useState(0);
  const [score, setScore] = useState({ scored: 0, show: false });
  const [begin, setBegin] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [stopped, setStopped] = useState(false);
  const [modal,setModal] = useState(false);

  useEffect(() => {
    if (parseInt(localStorage.getItem("time")) > 1) {
      setTimeout(() => {
        if(localStorage.getItem("time")){
            localStorage.setItem("time",parseInt(localStorage.getItem("time").toString()) - 1);
            setSeconds(parseInt(localStorage.getItem("time").toString()));
        }
      }, 1000);
    } else {
      localStorage.removeItem("time");
      setModal(true);
      setBegin(false);
      setStopped(true);
    }
  }, [begin, localStorage.getItem("time")]);


  /// moving on to the next question
  const post_call = () => {
    if (id !== null && value !== null) {
      if (counter < questions.length - 1) {
        setCounter(counter + 1);
      }
    }
  };


  /// calculating the score
  const Score = async () => {
    var result = 0;

    questions.forEach((question) => {
      if (
        localStorage.getItem(`${question.id}`) !== null &&localStorage.getItem(`${question.id}`).toString().localeCompare(question.answer) === 0) {
        result = result + 1;
      }
    });
    if(result >= parseInt(localStorage.getItem('best').toString())??0){
        localStorage.setItem('best', result);
    }
    setScore({ ...score, scored: result, show: true });
    setModal(true)
  };

  /// setting the timer
  const startTimer = () => {
    localStorage.setItem("time", 30);
    setStopped(false);
    setBegin(true);
    retake();
  };

  if ((begin || localStorage.getItem("time") !== null) && stopped === false) {
    return (
      <div className="cover">
        <Modal isOpen={modal}>
            <ModalBody>
                <div className="container" style={{display:'flex', justifyContent:'center', justifyItems:'center'}}>
                    <h4>Your Score:{score.scored} out of 4</h4>
                </div>
                <div className="container" style={{display:'flex', justifyContent:'center'}}>
                    <button type='button' className='btn btn-danger' onClick={()=>{ 
                    localStorage.removeItem('time');
                    setBegin(false);
                    setStopped(true);
                    setModal(!modal);}}>Close</button>
                </div>
            </ModalBody>
        </Modal>
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <h4 style={{marginTop:'2vh'}}>Time left: {localStorage.getItem("time")} sec</h4>
        </div>

        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <button
            onClick={() => {
              if (counter > 0) {
                setCounter(counter - 1);
              }
            }}
            type="button"
            className="btn btn-primary"
            style={{ borderRadius: "5vw", minHeight: "10vh", minWidth: "15vw" }}
          >
            Prev
          </button>
          <Progress
            value={(counter + 1) * 25}
            style={{ width: "35vw", height: "5vh" }}
          >
            {(counter + 1) * 25}%
          </Progress>
          <button
            onClick={() => {
              if (counter < questions.length - 1) {
                setCounter(counter + 1);
              }
            }}
            type="button"
            className="btn btn-primary"
            style={{ borderRadius: "5vw", minHeight: "10vh", minWidth: "15vw" }}
          >
            Next
          </button>
        </div>
        <div>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Card style={{minHeight:"20vh", minWidth: "30vh", padding:"3vh 3vw", backgroundColor:`#ff8411`, marginTop:"4vh"}}>
                <CardBody style={{backgroundColor:`#ff8411`, color:'white'}}><h2>{questions[counter].question}</h2></CardBody>
            </Card>
          </div>
          <div style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}>
          <ol>
              {questions[counter].options.map((option) => {
                if (
                  localStorage.getItem(`${questions[counter].id}`) !== null &&
                  localStorage
                    .getItem(`${questions[counter].id}`)
                    .toString()
                    .localeCompare(option.option) === 0
                ) {
                  return (
                      <div className="container Option_selected" >
                        <input
                        type="radio"
                        value={option.option}
                        name="radiobutton"
                        onChange={(e) => {
                          setId(questions[counter].id);
                          setValue(option.option);
                        }}
                        checked
                       />{option.option}
                      </div>
                  );
                } else {
                  return (
                       <div className="container Options">
                        <input
                        type="radio"
                        value={option.option}
                        name="radiobutton"
                        onChange={(e) => {
                          setId(questions[counter].id);
                          setValue(option.option);
                          localStorage.setItem(
                            `${questions[counter].id}`,
                            option.option
                          );
                        }}/>{option.option}
                       </div>
                  );
                }
              })}
            </ol>
          </div>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >

            <button
              onClick={() => retake()}
              className="btn btn-secondary"
              style={{
                borderRadius: "5vw",
                minHeight: "8vh",
                minWidth: "12vw",
              }}
            >Retake</button>
            {counter === 3 ? (
              <button
                onClick={() => Score()}
                className="btn btn-success"
                style={{
                  borderRadius: "5vw",
                  minHeight: "8vh",
                  minWidth: "12vw",
                  marginBottom:'2vh'
                }}
              >Submit</button>) : (
              <button
                onClick={() => post_call()}
                className="btn btn-danger"
                style={{
                  borderRadius: "5vw",
                  minHeight: "8vh",
                  minWidth: "12vw",
                  marginBottom:'2vh'
                }}
              >Proceed</button>
            )}
          </div>
        </div>
        {score.show ?<p>{score.scored}</p>: <div></div>}
      </div>
    );
  }
  return (
    <div className="cover">
        <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <h3 style={{marginTop:"30vh",}}>Pop Quiz!</h3>
      </div>
      <div
        className="container"
        style={{

          marginTop:"3vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => startTimer()}
          style={{
            borderRadius: "5vw",
            minHeight: "10vh",
            minWidth: "15vw",
          }}
        ><b><h5>Start</h5></b></button>
      </div>
      <div
        className="container"
        style={{
          padding:"2vh 3vw",
          backgroundColor:"orange",
          color:'white',
          width:'30vw',
          marginTop:"2vh",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}>
            <h5>Best Score: {localStorage.getItem('best')}</h5>
      </div>
    </div>
  );
}
