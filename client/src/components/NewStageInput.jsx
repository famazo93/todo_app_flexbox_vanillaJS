function NewStageInput(props) {
    return (
        <>
            <input name='stage-input' className='stage-name-input' type='text' onChange={props.handleChange} placeholder='Enter stage name'></input>
            <button name='stage-submit' onClick={props.addNewStage} className='add-new-stage-button'>Add New Stage</button>
        </>
    )
}

export default NewStageInput;