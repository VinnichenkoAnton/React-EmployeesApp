import './app-info.css';

const AppInfo = ({amountOfEmployees, amountToRise}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {amountOfEmployees}</h2>
            <h2>Премию получат: {amountToRise}</h2>
        </div>
    )
}; 

export default AppInfo;