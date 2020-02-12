import React from 'react'
import Moment from 'react-moment';
import { useDispatch } from 'react-redux';
import { deleteEDU } from "../../actions/userActions";

const Education = (props) => {
    const dispatch = useDispatch()
    const handleDelete = id => {
        dispatch(deleteEDU(id));
    }
    return (
        <div>
            <h4> Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Scholl</th>
                        <th>Degree</th>
                        <th>Years</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {props.education && props.education.map((edu, index) => (
                        <tr key={index}>
                            <td> {edu.school}</td>
                            <td>{edu.degree}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">
                                    {edu.from}
                                </Moment> -
                                <Moment format="YYYY/MM/DD">
                                    {edu.to}
                                </Moment>
                            </td>
                            <td> <button className="btn btn-danger" onClick={() => handleDelete(edu._id)}>delete</button> </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default Education
