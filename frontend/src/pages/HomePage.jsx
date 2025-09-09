import React, {useEffect, useState} from 'react';
import Header from "@/components/Header.jsx";
import AddTasks from "@/components/AddTasks.jsx";
import StatsAndFilters from "@/components/StatsAndFilters.jsx";
import TaskList from "@/components/TaskList.jsx";
import TaskListPagination from "@/components/TaskListPagination.jsx";
import DateTimeFilter from "@/components/DateTimeFilter.jsx";
import Footer from "@/components/Footer.jsx";
import api from "@/api/axiosConfig.js"
import {toast} from "sonner";
import {visibleTaskLimit} from "@/lib/data.js";

const HomePage = () => {
    const [taskBuffer, setTaskBuffer] = useState([]);
    const [activeTasksCount, setActiveTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [filter, setFilter] = useState("all");
    const [dateQuery, setDateQuery] = useState("today");
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchTasks();
    }, [dateQuery]);

    useEffect(() => {
        setPage(1);
    }, [filter, dateQuery]);

    // truy xuất api với axios
    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?filter=${dateQuery}`);
            setTaskBuffer(res.data.tasks);
            setActiveTasksCount(res.data.activeTasksCount);
            setCompletedTasksCount(res.data.completedTasksCount);
            console.log(res.data);
        } catch (error) {
            console.error('Lỗi khi truy xuất tasks:', error);
            toast.error('Lỗi khi truy xuất tasks');
        }
    };
    // biến lưu danh sách nhiệm vụ đã lọc
    const filteredTasks = taskBuffer.filter((task) => {
        switch (filter){
            case "active":
                return task.status === "ACTIVE";
            case "completed":
                return task.status === "COMPLETE";
            default:
                return true;
        }
    });
    // hàm xử lý thêm nhiệm vụ mới
    const handleTaskChange = () => {
      fetchTasks();
    }

    const handleNext = ()=>{
        if(page < totalPages){
            setPage((prev)=> prev +1);
        }
    }
    const handlePrev = ()=>{
        if(page > 1){
            setPage((prev)=> prev -1);
        }
    }
    const handlePageChange = (pageNumber) => {
        setPage(pageNumber);
    }

    // phân trang
    const  visibleTasks = filteredTasks.slice((page - 1) * visibleTaskLimit, page * visibleTaskLimit);

    if(visibleTasks.length === 0){
        handlePrev();
    }

    const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);
    return (
        <div className="min-h-screen w-full bg-[#fefcff] relative">
            {/* Dreamy Sky Pink Glow */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
        radial-gradient(circle at 30% 70%, rgba(173, 216, 230, 0.35), transparent 60%),
        radial-gradient(circle at 70% 30%, rgba(255, 182, 193, 0.4), transparent 60%)`,
                }}
            />
            {/* Your Content/Components */}
    <div className="container pt-8 mx-auto relative z-10">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
            {/* Đầu Trang */}
            <Header/>
            {/* Tạo Nhiệm Vụ */}
            <AddTasks handleNewTaskAdded={handleTaskChange}/>
            {/* Thống Kê và Bộ Lọc */}
            <StatsAndFilters activeTasksCount={activeTasksCount} completedTasksCount={completedTasksCount}
            filter={filter} setFilter={setFilter} />
            {/*  Danh Sách Nhiệm Vụ  */}
            <TaskList filteredTasks={visibleTasks} filter={filter} handleTaskChange={handleTaskChange}/>
            {/*  Phân Trang và Lọc Theo Date  */}
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                        <TaskListPagination
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        handlePageChange={handlePageChange}
                        page={page}
                        totalPages={totalPages}
                        />
                        <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery}/>
                    </div>
                    {/*  Chân Trang  */}
                    <Footer activeTasksCount={activeTasksCount} completedTasksCount={completedTasksCount}/>
                </div>
            </div>
        </div>

    );
};

export default HomePage;