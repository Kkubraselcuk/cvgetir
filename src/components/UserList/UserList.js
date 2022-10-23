import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button } from 'react-bootstrap';
import "./UserList.scss";
import Swal from 'sweetalert2'

import LoginContext from '../../context/LoginContext';

const UserList = () => {
    const{activeUser} = useContext(LoginContext);
    const [users, setUsers] = useState([]);

    const fetchUser = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/userdetaillist`);
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    }
    
    const getUserDetail = async (userId) =>{
        const resUserDetail = await axios.get(`http://localhost:8080/userdetaillist/${userId}`);
        {
            Swal.fire({
                width: 400,
                html: `
                Name Surname: ${resUserDetail.data.name} ${resUserDetail.data.surname}<br/>
                Phone Number : ${resUserDetail.data.phoneNumber}<br/>
                E-Mail : ${resUserDetail.data.eMail}<br/>
                University : ${resUserDetail.data.university}<br/>
                Department : ${resUserDetail.data.universityDepartment}<br/>
                Work : ${resUserDetail.data.work}<br/>
                Work Date : ${resUserDetail.data.workDate} year<br/>
                Work Comment : ${resUserDetail.data.workComment}<br/>
                Professional Skill : ${resUserDetail.data.professionalSkill}<br/>`,
                icon: 'success',
            })
        }
        
    };

    useEffect(() => {
        fetchUser();

    },[])
    return (
        <>
        <div className="tableDv">

            <Table striped bordered hover variant="secondary" size="sm" responsive="md">
                <thead className="table">
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone Number</th>
                        <th>E-Mail</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user)=>(
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.surname}</td>
                            <td>{user.phoneNumber}</td>
                            <td>{user.eMail}</td>
                            <td><Button variant="outline-success" size="sm" onClick={() => {getUserDetail(user.id);}}>Detail</Button></td>
                        </tr>
                    ))}
                    
                </tbody>
            </Table>
            </div>
        </>
    );
};
export default UserList;