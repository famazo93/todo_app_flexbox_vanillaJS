function NewStageInput(props) {
    return (
        <>
            <input className='stage-name-input' type='text' onChange={props.handleChange} placeholder='Enter stage name'></input>
            <button onClick={props.addNewStage} className='add-new-stage-button'>Add New Stage</button>
        </>
    )
}

export default NewStageInput;