import React, { useState } from 'react';
import './dashboard.css';
import logo from '../../assets/logos/logo.png';
import hidemenu from '../../assets/icons/leftmenu.svg';
import showmenu from '../../assets/icons/fullsite.svg';
import UsersComponent from '../../components/users/users.component';
import StadisticsComponent from '../../components/stadistics/stadistics.component';
import CompaniesComponent from '../../components/companies/companies.component';
import HomeComponent from '../../components/home/home.component';
import ForumComponent from '../../components/forum/forum.component';
import Home from '../../assets/icons/home.svg';
import User from '../../assets/icons/users.svg';
import StadisticsIcon from '../../assets/icons/stadistics.svg';
import CompaniesIcon from '../../assets/icons/companies.svg';
import Forum from '../../assets/icons/forum.svg';

function Dashboard() {
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const [activeComponent, setActiveComponent] = useState('home'); // Estado para controlar el componente activo

    const toggleMenu = () => {
        setIsMenuVisible(!isMenuVisible);
    };

    // Función para renderizar el componente según el estado activo
    const renderActiveComponent = () => {
        switch (activeComponent) {
            case 'home':
                return <HomeComponent />;
            case 'users':
                return <UsersComponent />;
            case 'stadistics':
                return <StadisticsComponent />;
            case 'companies':
                return <CompaniesComponent />;
            case 'forum':
                return <ForumComponent />;
            default:
                return <UsersComponent />;
        }
    };

    return (
        <div className={`dashboardContainer ${isMenuVisible ? 'menu-visible' : 'menu-hidden'}`}>
            <div className={`dashboardLeftMenu ${isMenuVisible ? 'show' : 'hide'}`}>
                <div className='leftMenuLogos'>
                    <img src={showmenu} alt="Show Menu" className='showMenu' onClick={toggleMenu} />
                    <img src={logo} alt="Logo" className='logo' />
                </div>
                <div className='menuItemsContainer'>
                    <div className='menuItem' onClick={() => setActiveComponent('home')}>
                        <div className='menuItemContainer'>
                            <img src={Home} alt="" className='dashboardIcons' />
                            Inicio
                        </div>
                    </div>
                    <div className='menuItem' onClick={() => setActiveComponent('users')}>
                        <div className='menuItemContainer'></div>
                        <img src={User} alt="" className='dashboardIcons' />
                        Usuarios
                    </div>
                    <div className='menuItem' onClick={() => setActiveComponent('stadistics')}>
                        <div className='menuItemContainer'></div>
                        <img src={StadisticsIcon} alt="" className='dashboardIcons' />
                        Estadística
                    </div>
                    <div className='menuItem' onClick={() => setActiveComponent('companies')}>
                        <div className='menuItemContainer'>
                            <img src={CompaniesIcon} alt="" className='dashboardIcons' />
                            Empresas
                        </div>
                    </div>
                    <div className='menuItem' onClick={() => setActiveComponent('forum')}>
                        <div className='menuItemContainer'>
                            <img src={Forum} alt="" className='dashboardIcons' />
                            Foro
                        </div>
                    </div>
                </div>
            </div>
            <div className="dashboardRightContent">
                <img src={hidemenu} alt="Hide Menu" className='hideMenu' onClick={toggleMenu} />
                <div className="dashboardRightContentInner">
                    {renderActiveComponent()}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
