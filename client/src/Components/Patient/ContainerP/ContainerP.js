import React from 'react'
import './ContainerP.css'
import { useSelector, useDispatch } from "react-redux";
import {useState} from "react"
import { Table, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboardList } from '@fortawesome/free-solid-svg-icons'
import Appointment from '../Appointment/Appointmet'
import {TOGGLE_APPOINT} from '../../../actions/types'
import { Pagination } from '@material-ui/lab';

const ContainerP = () => {
    let pag = false;
    let np = 1;
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const [gender, setGender] = useState("")
    const [address, setAddress] = useState("")
    let doc;
    let docs = useSelector((state) => state.data_red.doc);
    let addressOpt =  [...new Set(docs.map(e=>e.address))]
    let filter_c = useSelector((state) => state.data_red.filter_c);
    filter_c? doc = (docs.filter(x=>x.speciality===filter_c)): doc = docs
    address?doc = (doc.filter(x=>x.gender!==gender).filter(x=>x.address===address)):doc = doc.filter(x=>x.gender!==gender)
    const doctors = doc
    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }
    (doctors.length/9)<=1? pag=true : np= Math.floor(doctors.length/9)+1
    let docPage = doctors.slice((page-1)*9, (page-1)*9+9);
    return (
        <div className="testc">
            <div className="filtrage">
            <div>
                <label>Filter By Gender : </label>
                <select name="F_Gender" onChange={(e)=>setGender(e.target.value)} value={gender}>
                    <option name="F_Gender" value="">All</option>
                    <option name="F_Gender" value="female">Male</option>
                    <option name="F_Gender" value="male">Female</option>
                </select>
            </div>
            <div>
                <label>Filter By Address : </label>
                <select name="F_Address" onChange={(e)=>setAddress(e.target.value)} value={address}>
                    <option name="F_Address" value="">All</option>
                    {addressOpt.map((el, index) => {
                        return <option key={index} name="F_Address" value={el}>{el}</option>;
                    })}
                </select>
            </div>
            </div>
            <Table striped bordered hover style={{margin:10}}>
                <thead>
                    <tr>
                    <th>Dr. Name</th>
                    <th>Speciality</th>
                    <th>Address</th>
                    <th>Gender</th>
                    <th>Get An Appointment</th>
                    </tr>
                </thead>
                <tbody>
                    {doc.length>0? docPage.map((el, index) => {
                        return (
                            <tr key={index}>
                            <td>{"Dr. "+el.first_name+" "+el.last_name}</td>
                            <td>{el.speciality}</td>
                            <td>{el.address}</td>
                            <td>{el.gender}</td>
                            <td className="tdIcon"><FontAwesomeIcon className="iconAppoint" onClick={() => dispatch({type:TOGGLE_APPOINT, payload:el})}  icon={faClipboardList}/></td>
                            </tr>
                        )
                    }):null}
                </tbody>
            </Table>
            {doc.length<1?<Alert variant='danger' style={{width:500,textAlign:"center",marginLeft:"auto",marginRight:"auto"}}> Sorry There Is No Doctors With This Filter</Alert>:null}
            <Appointment/>
            <Pagination count={np} disabled={pag} page={page} onChange={handleChangePage} />
        </div>
    )
}

export default ContainerP
