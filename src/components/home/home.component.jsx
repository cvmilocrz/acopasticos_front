import './home.component.css';
import usersIcon from '../../assets/icons/users.svg';
import CompaniesIcon from '../../assets/icons/companies.svg';
import ForoIcon from '../../assets/icons/forum.svg';

function Home() {
    return (
        <>
            <div className='homeContainer'>
                <div className='homeContainerHeader'>
                    Panel de Control
                    
                </div>
                <div className='homeContainerBody'>
                    <div className='homeContentCard'>
                        <div className='homeContentCardHeader'>
                            <img src={usersIcon} alt="" />
                            Usuarios
                        </div>
                        <div className='homeContentCardContent'>
                            24
                        </div>
                    </div>
                    <div className='homeContentCard'>
                        <div className='homeContentCardHeader'>
                            <img src={CompaniesIcon} alt="" />
                            Empresas
                        </div>
                        <div className='homeContentCardContent'>
                            107
                        </div>
                    </div>
                    <div className='homeContentCard'>
                        <div className='homeContentCardHeader'>
                            <img src={usersIcon} alt="" />
                            Contactos
                        </div>
                        <div className='homeContentCardContent'>
                            424
                        </div> 
                    </div>
                    <div className='homeContentCard'>
                        <div className='homeContentCardHeader'>
                            <img src={ForoIcon} alt="" />
                            Publicaciones
                        </div>
                        <div className='homeContentCardContent'>
                            12
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;