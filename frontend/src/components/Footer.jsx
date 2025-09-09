import React from 'react';

const Footer = ({completedTasksCount =0, activeTasksCount = 0}) => {
    return (
        <>
            {completedTasksCount + activeTasksCount > 0 && (
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                        {
                            completedTasksCount > 0 && (
                                <>
                                    🎉Bạn đã hoàn thành {completedTasksCount} nhiệm vụ
                                    {
                                        activeTasksCount > 0 && `, còn ${activeTasksCount} nhiệm vụ nữa thôi. Cố lên!`
                                    }
                                </>
                            )
                        }

                        {completedTasksCount === 0 && activeTasksCount > 0 && (
                            <>Hãy hoàn thành {activeTasksCount} nhiệm vụ nào! Cố lên!</>
                        )
                        }
                    </p>
                </div>
            ) }
        </>
    );
};

export default Footer;