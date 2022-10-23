import React, { useEffect, useState, useContext, useRef } from 'react';
import axios from 'axios';
import LoginContext from '../../context/LoginContext';
import "./CreateCvPage.scss";
import cvgif from "../../img/cv.gif"
const CreateCvPage = () => {
    const { activeUser } = useContext(LoginContext);
    const [updateORcreate, setupdateORcreate] = useState(false);
    const inputname = useRef(null);
    const inputsurname = useRef(null);
    const inputuniversity = useRef(null);
    const inputuniversityDepartment = useRef(null);
    const inputwork = useRef(null);
    const inputworkDate = useRef(null);
    const inputworkComment = useRef(null);
    const inputprofessionalSkill = useRef(null);


    const restUpdateOrCreateCv = async ()=>{
        const resUserDetail = await axios.get(`http://localhost:8080/userdetaillist/${activeUser.id}`);
        if(resUserDetail.data.id != null){
            setupdateORcreate(true);
        }
    }
    const createCv = () => {
        axios.post('http://localhost:8080/userdetaillist', {
            id: activeUser.id,
            name: inputname.current.value,
            surname: inputsurname.current.value,
            phoneNumber: activeUser.phoneNumber,
            eMail: activeUser.eMail,
            university: inputuniversityDepartment.current.value,
            universityDepartment: inputwork.current.value,
            work: inputworkDate.current.value,
            workDate: inputworkComment.current.value,
            workComment: inputprofessionalSkill.current.value,
            professionalSkill: inputprofessionalSkill.current.value,
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    };
    const updateCv = () =>{
        axios.put(`http://localhost:8080/userdetaillist/${activeUser.id}`, {
            id: activeUser.id,
            name: inputname.current.value,
            surname: inputsurname.current.value,
            phoneNumber: activeUser.phoneNumber,
            eMail: activeUser.eMail,
            university: inputuniversityDepartment.current.value,
            universityDepartment: inputwork.current.value,
            work: inputworkDate.current.value,
            workDate: inputworkComment.current.value,
            workComment: inputprofessionalSkill.current.value,
            professionalSkill: inputprofessionalSkill.current.value,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    };
    useState(() => {
        restUpdateOrCreateCv();
        console.log(activeUser);
    });


    return (
        <>
        <div className="createCv">
            <div className="createCvImg">
                <img src={cvgif} width="400"></img>
            </div>
        
            <div className="createCvDv">
                <input name="name" type="text" placeholder="Name" ref={inputname}></input>
                <input name="surname" type="text" placeholder="Surname" ref={inputsurname}></input>
                <input name="phoneNumber" type="text" placeholder={activeUser.phoneNumber} disabled></input>
                <input name="eMail" type="text" placeholder={activeUser.eMail} disabled></input>
                <input name="university" type="text" placeholder="University" ref={inputuniversity}></input>
                <input name="universityDepartment" type="text" placeholder="University Department" ref={inputuniversityDepartment}></input>
                <input name="work" type="text" placeholder="Work" ref={inputwork}></input>
                <input name="workDate" type="text" placeholder="Work Date" ref={inputworkDate}></input>
                <input name="workComment" type="text" placeholder="Work Comment" ref={inputworkComment}></input>
                <input name="professionalSkill" type="text" placeholder="Professional Skills" ref={inputprofessionalSkill}></input>
                {updateORcreate ? (<button onClick={updateCv}>Update CV</button>) : (<button onClick={createCv}>Create CV</button>)}
                
            </div>
        </div>
        </>
    );
};
export default CreateCvPage;