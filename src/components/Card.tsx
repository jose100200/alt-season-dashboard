import React, { type ReactNode } from "react";

/**Use interface when you want to describe object-like structures like props */
interface CardProps {
    title: string;
    children: ReactNode; /**React node = text, jsx, another component, etc */
}

/**React.FC type for the component itself */
/**CardProps type for the props the component expects */
const Card: React.FC<CardProps> = ({title, children}) => {
return (
    <div className="card">
        <h2 className="card-title">{title}</h2>
        <div className="card-body">
            {children}
        </div>
    </div>
    );
};

export default Card; 