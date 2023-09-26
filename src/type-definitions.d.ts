export type TextInputType = 
    React.KeyboardEvent<HTMLInputElement> | 
    React.ChangeEvent<HTMLInputElement>
    
export type MessageType = {
    name: string;
    message: string;
    key: string;
 }