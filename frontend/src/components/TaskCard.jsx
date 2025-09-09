import React, {useState} from 'react';
import {Card} from "@/components/ui/card.jsx";
import {cn} from "@/lib/utils.js";
import {Button} from "@/components/ui/button.jsx";
import {Calendar, CheckCircle2, Circle, SquarePen, Trash2} from "lucide-react";
import {Input} from "@/components/ui/input.jsx";
import {toast} from "sonner";
import api from "@/api/axiosConfig.js"

const TaskCard = ({task, index, handleTaskChange}) => {
    const [isEditting, setIsEditting] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");
    // Xóa task
    const deleteTask = async (taskId) => {
      try{
          await api.delete(`/tasks/${taskId}`);
            toast.success("Xóa nhiệm vụ thành công!");
            handleTaskChange();
      }catch (error){
            console.error("Lỗi khi xóa nhiệm vụ:", error);
            toast.error("Lỗi khi xóa nhiệm vụ!");
      }
    }

    // Update task
    const updateTask = async () => {
        try {
            setIsEditting(false);
            await api.put(`/tasks/${task.id}`, {
                title: updateTaskTitle,
            })
            toast.success(`Nhiệm vụ đổi thành "${updateTaskTitle}"`);
            handleTaskChange();
        }catch (error) {
            console.error("Lỗi khi cập nhật nhiệm vụ.", error);
            toast.error("Lỗi khi cập nhật nhiệm vụ.");
        }
    }

    // Xác nhận hoàn thành task
    const toggleTaskCompleteButton = async () => {
        try{
            if(task.status === 'ACTIVE'){
                await api.put(`/tasks/${task.id}`,{
                    status: 'COMPLETE',
                    completedAt: new Date().toISOString(),
                });
                toast.success(`"${task.title}" đã hoàn thành! 🎉`);

            }else{
                await api.put(`/tasks/${task.id}`,{
                    status: 'ACTIVE',
                    completedAt: null,
                });
                toast.success(`"${task.title}" đã chuyển sang chưa hoàn thành!`);
            }
            handleTaskChange();
        }catch (error) {
            console.error("Lỗi khi cập nhật trạng thái nhiệm vụ.", error);
            toast.error("Lỗi khi cập nhật trạng thái nhiệm vụ.");
        }
    }

    // Enter để xác nhận thay vì click button
    const handleKeyPress = (event) => {
        if(event.key === 'Enter'){
            updateTask();
        }
    }

    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === 'COMPLETE' && 'opacity-75'
        )}
            style={{animationDelay: `${index * 50}ms`}}
        >
        <div className="flex items-center gap-4">
        {/*  nút tròn  */}
            <Button
                variant='ghost'
                size='icon'
                className={cn(
                    "flex-shrink-0 size-8 rounded-full transition-all duration-200",
                    task.status === 'COMPLETE'
                        ? "text-success hover:text-success/80"
                        : "text-muted-foreground hover:text-primary"
                )}
                onClick={toggleTaskCompleteButton}
            >
                {
                    task.status === 'COMPLETE' ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )
                }
            </Button>
        {/*  Hiện thị hoặc chỉnh sửa tiêu đề  */}
            <div className="flex-1 min-w-0">
                {
                    isEditting ? (
                        <Input
                        placeholder="Cần phải làm gì?"
                        className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                        type="text"
                        value={updateTaskTitle}
                        onChange ={(event) => setUpdateTaskTitle(event.target.value)}
                        onKeyPress={handleKeyPress}
                        onBlur={()=>{
                            setIsEditting(false);
                            setUpdateTaskTitle(task.title || "");
                        }}
                        />
                    ):(
                        <p className={cn(
                            "text-base transition-all duration-200",
                            task.status === 'COMPLETE' ?
                                "line-through text-muted-foreground"
                                : "text-foreground"
                        )}>
                            {task.title}
                        </p>
                    )
                }
                {/*  Ngày tạo và hoàn thành  */}
                <div className="flex items-center gap-2 mt-1">
                    <Calendar className="size-3 text-muted-foreground"/>
                    <span className="text-xs text-muted-foreground">
                    {new Date(task.createdAt).toLocaleString() }
                </span>
                    {task.completedAt && (
                        <>
                            <span className="text-xs text-muted-foreground"> - </span>
                            <Calendar className="size-3 text-muted-foreground"/>
                            <span className="text-xs text-muted-foreground">
                    {new Date(task.completedAt).toLocaleString() }
                </span>
                        </>
                    )}
                </div>
            </div>

        {/*  Nút chỉnh xóa  */}
            <div className="hidden gap-2 group-hover:inline-flex animate-slide-up">
            {/*  nút edit  */}
                <Button
                variant="ghost"
                size="icon"
                className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-info"
                onClick={()=>{
                    setIsEditting(true);
                    setUpdateTaskTitle(task.title || "");
                }}
                >
                    <SquarePen className="size-4"/>
                </Button>
            {/* delete*/}
                <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0 transition-colors size-8 text-muted-foreground hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                >
                    <Trash2 className="size-4"/>
                </Button>
            </div>
        </div>
        </Card>
    );
};

export default TaskCard;