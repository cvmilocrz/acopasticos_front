import './forum.component.css';
function Forum() {
    return (
        <>
            <div className='forumContainer'>
                <div className='forumContainerHeader'>Foro de acoplasíticos</div>
                <div className='forumContainerContent'>
                    <div className='forumCardsContainer'>
                        <div className='forumCard'>
                            <div className='forumCardHeader'>
                                BIENVENIDO AL FORO DE ACOPLASTICOS!
                            </div>
                            <div className='forumCardContent'>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                </p>
                                <img src="https://www.aceromafe.com/wp-content/uploads/2022/07/polimero-plastico.jpg" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Forum;