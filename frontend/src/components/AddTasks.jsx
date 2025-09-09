import React, {useState} from 'react';
import {Card} from "@/components/ui/card.jsx";
import {Input} from "@/components/ui/input.jsx";
import {Button} from "@/components/ui/button.jsx";
import {Plus} from "lucide-react";
import api from "@/api/axiosConfig.js"
import {toast} from "sonner";

const AddTasks = ({handleNewTaskAdded}) => {
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const addTask = async () =>{
        if(newTaskTitle.trim()){
            try{
                await api.post("/tasks", {title: newTaskTitle});
                toast.success(`Thêm nhiệm vụ "${newTaskTitle}" thành công!`);
                handleNewTaskAdded();
            }catch (error){
                console.error("Lỗi khi thêm nhiệm vụ:", error);
                toast.error("Lỗi khi thêm nhiệm vụ mới!");
            }
            setNewTaskTitle("");
        }else{
            toast.error("Bạn cần nhập nội dung của nhiệm vụ!");
        }
    }
    
    const handleKeyPress = (event) => {
      if(event.key === 'Enter'){
            addTask();
      }
    }

    return (
        <Card className="p-6 border-0 bg-gradient-to-card shadow-custom-lg">
            <div className="flex flex-col gap-3 sm:flex-row">
                <Input
                type="text"
                placeholder="Cần phải làm gì...?"
                className="h-12 text-base bg-slate-50 sm:flex-1 border-border/50 focus:border-primary/50 focus:ring-primary/20"
                value={newTaskTitle}
                onChange = {(event) => setNewTaskTitle(event.target.value)}
                onKeyPress = {handleKeyPress}
                />
                <Button
                variant="gradient"
                size="xl"
                className="px-6"
                onClick={addTask}
                disabled={!newTaskTitle.trim()}
                >
                    <Plus className="size-5"/>
                    Thêm
                </Button>
            </div>
        </Card>
    );
};

export default AddTasks;