import React from 'react';
import { FaCircleNotch, FaHeart } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { MdDelete } from "react-icons/md";
import { IoAddOutline } from "react-icons/io5";
import axios from 'axios';

const Cards = ({ home, setInputDiv, data, fetchAllTasks }) => {
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const handleComplete = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/v2/update-complete-task/${id}`, {}, { headers });
            fetchAllTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const handleImportant = async (id) => {
        try {
            await axios.put(`http://localhost:3000/api/v2/update-important-task/${id}`, {}, { headers });
            fetchAllTasks();
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/v2/delete-task/${id}`, { headers });
            fetchAllTasks();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data && data.map((item, index) => (
                <div key={index} className="flex flex-col justify-between h-[250px] p-6 bg-zinc-800 rounded-4xl">
                    <div className="flex flex-col gap-3">
                        <h3 className="text-[22px] font-semibold">{item.title}</h3>
                        <p className="text-zinc-400 text-[16px]">{item.description}</p>
                        <p className="text-zinc-300 text-[18px]">
                            <span className="text-zinc-400">Points: </span> {item.point}
                        </p>
                    </div>
                    <div className="text-[22px] flex justify-between">
                        <button className="text-red-400 cursor-pointer" onClick={() => handleComplete(item._id)}>
                            {item.complete === false ? <FaCircleNotch className="text-red-400" /> : <TiTick className="text-green-400 text-[24px]" />}
                        </button>
                        <button onClick={() => handleImportant(item._id)} className={`${item.important ? "text-red-500" : "text-gray-500"} cursor-pointer`}>
                            <FaHeart />
                        </button>
                        <button onClick={() => deleteTask(item._id)} className="text-gray-500 cursor-pointer hover:text-red-500">
                            <MdDelete />
                        </button>
                    </div>
                </div>
            ))}
            
            {/* Add Task Button */}
            {home === "true" && (
                <button
                    onClick={() => setInputDiv("fixed")}
                    className="flex flex-col gap-2 justify-center items-center h-[250px] p-6 bg-zinc-800 rounded-4xl hover:cursor-pointer hover:scale-95 transition-all duration-300"
                >
                    <IoAddOutline className="text-4xl text-black bg-zinc-400 rounded-4xl" />
                    <h2 className="text-xl">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
