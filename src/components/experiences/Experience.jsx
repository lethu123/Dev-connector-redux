import React from 'react'
import Moment from 'react-moment';
import { deleteEXP } from "../../actions/userActions"
import { useDispatch } from 'react-redux';
const Experience = (props) => {
    const dispatch = useDispatch()
    const handleDelete = id => {
        dispatch(deleteEXP(id));
    }

    return (
        <div>
            <h4> Experience Credentials</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {props.experience && props.experience.map(exp => (
                        <tr key={exp._id}>
                            <td> {exp.company}</td>
                            <td>{exp.title}</td>
                            <td>
                                <Moment format="YYYY/MM/DD">
                                    {exp.from}
                                </Moment> -
                                <Moment format="YYYY/MM/DD">
                                    {exp.to}
                                </Moment>
                            </td>
                            <td> <button className="btn btn-danger" onClick={() => handleDelete(exp._id)}>delete</button> </td>
                        </tr>
                    ))}


                </tbody>
            </table>
        </div>

    )
}

export default Experience
