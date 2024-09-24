import './companies.component.css';
import { useEffect, useState } from 'react';
import Filter from '../../assets/icons/filter.svg';
import useFetchCompanies from '../../hooks/useFetchCompanies';
import TrashIcon from '../../assets/icons/trash.svg';
import EditIcon from '../../assets/icons/edit.svg';
import ExcelIcon from '../../assets/icons/excel.svg';
import Modal from '../../tools/modal';
import UsersIcon from '../../assets/icons/users.svg';
import Loader from '../../tools/loader';

function Companies() {
    const { companies, loading, error, createCompany: createCompanyService, deleteCompany: deleteCompanyService, updateCompanies: updateCompanyService, contacts } = useFetchCompanies();
    const [createCompanyModal, setCreateCompanyModal] = useState(false);
    const [deleteCompanyModal, setDeleteCompanyModal] = useState(false);
    const [updateCompanyModal, setUpdateCompanyModal] = useState(false);
    const [showContacts, setShowContacts] = useState(false);

    const openCreateCompanyModal = () => setCreateCompanyModal(true);
    const closeCreateCompanyModal = () => { setCreateCompanyModal(false); };

    const openDeleteCompanyModal = (name) => { setDeleteCompanyModal(true); };
    const closeDeleteCompanyModal = () => { setDeleteCompanyModal(false); };

    const openUpdateCompanyModal = () => { setUpdateCompanyModal(true); };
    const closeUpdateCompanyModal = () => { setUpdateCompanyModal(false); };


    const [deleteCompanyData, setDeleteCompanyData] = useState({
        id: 0
    });
    const [deleteCompanyName, setDeleteCompanyName] = useState('');

    const handleDeleteCompany = async () => {
        try {
            await deleteCompanyService(deleteCompanyData);
            closeDeleteCompanyModal();
        } catch (error) {
            console.error("Error al eliminar empresa:", error);
            alert("Hubo un problema al eliminar la empresa. Inténtalo de nuevo.");
        }
    };

    const [updateCompanyData, setUpdateCompanyData] = useState({
        id: 0,
        NIT: '',
        company_name: '',
        acronym: '',
        affiliation_status: 1, // O lo que corresponda
        affiliation_date: '', // Cambia a formato correcto al usar el input
        disaffiliation_date: null, // Asegúrate de que este campo esté presente
        industry_sector: 1, // Ajusta según tu lógica
        is_producer: 1, // Ajusta según tu lógica
        primary_activity: '',
        secondary_activity: '',
        other_activity_1: '',
        other_activity_2: '',
        business_nature: 1, // Ajusta según tu lógica
        institutional_email: '',
        website: '',
        city: '',
        address_type: 1, // Ajusta según tu lógica
        address: '',
        phone: '',
        mobile: '',
    });

    const handleInputChangeUpdate = (field) => (e) => {
        const { value } = e.target;
        setUpdateCompanyData((prevData) => ({ ...prevData, [field]: value }));
    };

    const handleUpdateCompany = async () => {
        try {
            await updateCompanyService(updateCompanyData, updateCompanyData.id);
            closeUpdateCompanyModal();
        } catch (error) {
            console.error("Error al actualizar empresa:", error);
            alert("Hubo un problema al actualizar la empresa. Inténtalo de nuevo.");
        }
    };

    const [companyData, setCompanyData] = useState({
        NIT: '',
        company_name: '',
        acronym: '',
        affiliation_status: 1, // O lo que corresponda
        affiliation_date: '', // Cambia a formato correcto al usar el input
        disaffiliation_date: null, // Asegúrate de que este campo esté presente
        industry_sector: 1, // Ajusta según tu lógica
        is_producer: 1, // Ajusta según tu lógica
        primary_activity: '',
        secondary_activity: '',
        other_activity_1: '',
        other_activity_2: '',
        business_nature: 1, // Ajusta según tu lógica
        institutional_email: '',
        website: '',
        city: '',
        address_type: 1, // Ajusta según tu lógica
        address: '',
        phone: '',
        mobile: '',
    });

    const handleInputChange = (field) => (e) => {
        const { value } = e.target;
        setCompanyData((prevData) => ({
            ...prevData,
            [field]: field === 'is_producer' ? value === '1' :
                (field === 'affiliation_date' || field === 'disaffiliation_date' ? new Date(value).toISOString() : value),
        }));
    };

    const handleCreateCompany = async () => {
        if (!companyData.NIT || !companyData.company_name || !companyData.mobile) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        console.log("Intentando crear la empresa...", companyData);
        try {
            await createCompanyService(companyData);
            closeCreateCompanyModal();
        } catch (error) {
            console.error("Error al crear empresa:", error);
            alert("Hubo un problema al crear la empresa. Inténtalo de nuevo.");
        }
    };


    if (loading) return <Loader />;
    if (error) return <div>Error al cargar empresas: {error.message}</div>;

    return (
        <>
            <Modal className='createCompanyModal' isOpen={createCompanyModal}>
            <div className='createCompanyModal'>
                    <div className='createCompanyModalHeader'>
                        Añadir empresa
                        <div className='closeModalBtn' onClick={closeCreateCompanyModal}>&times;</div>
                    </div>
                    <div className='createCompanyModalContent'>
                        <div className='createCompanyForm'>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Nit
                                    <input type="text" placeholder="" onChange={handleInputChange('NIT')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Nombre de la Empresa
                                    <input type="text" placeholder="" onChange={handleInputChange('company_name')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Sigla
                                    <input type="text" placeholder="" onChange={handleInputChange('acronym')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Estado de Afiliación
                                    <select type="text" placeholder="Selecciona un estado" onChange={handleInputChange('affiliation_status')}>
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Fecha de Afiliación
                                    <input type="date" onChange={handleInputChange('affiliation_date')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Fecha de Desafiliación
                                    <input type="date" placeholder="" onChange={handleInputChange('affiliation_date')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Sector de la industria
                                    <select name="sector" id="sector" onChange={handleInputChange('industry_sector')}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Plásticos</option>
                                        <option value="2">Química</option>
                                        <option value="3">Petroquímica y sus relacionados</option>
                                        <option value="4">Cauchos</option>
                                        <option value="5">Pinturas</option>
                                        <option value="6">Tintas y Recubrimientos</option>
                                        <option value="7">Fibras</option>
                                        <option value="8">Impresión 3D</option>
                                        <option value="9">Fabricantes digitales</option>
                                        <option value="10">Materiales Compuestos</option>
                                        <option value="11">Maquinaria y Equipos</option>
                                        <option value="12">Consultoría</option>
                                        <option value="13">Servicios</option>
                                    </select>

                                </div>
                                <div className='createCompanyInput'>
                                    ¿Es productor?
                                    <select name="select" id="select" onChange={handleInputChange('is_producer')}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Si</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Actividad principal
                                    <input type="text" onChange={handleInputChange('primary_activity')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Actividad Secundaria
                                    <input type="text" onChange={handleInputChange('secondary_activity')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Otras actividades
                                    <input type="text" onChange={handleInputChange('other_activity_1')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Otras actividades
                                    <input type="text" onChange={handleInputChange('other_activity_2')} />
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    ¿Cúal es la naturaleza de sus operaciones?
                                    <select name="select" id="select" onChange={handleInputChange('business_nature')}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Nacional</option>
                                        <option value="2">Importación</option>
                                        <option value="3">Exportación</option>
                                    </select>
                                </div>
                                <div className='createCompanyInput'>
                                    Email institucional
                                    <input type="text" placeholder="" onChange={handleInputChange('institutional_email')} />
                                </div>
                                <div>
                                    Pagina web
                                    <input type="text" placeholder="" onChange={handleInputChange('website')} />
                                </div>
                                <div>
                                    ciudad
                                    <input type="text" placeholder="" onChange={handleInputChange('city')} />
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    tipo de direccion
                                    <select name="select" id="select" onChange={handleInputChange('address_type')}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Principal</option>
                                        <option value="2">Domicilio</option>
                                        <option value="3">otro</option>
                                    </select>
                                </div>
                                <div className='createCompanyInput'>
                                    Dirección
                                    <input type="text" placeholder="" onChange={handleInputChange('address')} />
                                </div>

                                <div className='createCompanyInput'>
                                    Telefono fijo
                                    <input type="text" placeholder="" onChange={handleInputChange('phone')} />
                                </div>
                                <div className='createCompanyInput'>
                                    Telefono movil
                                    <input type="text" placeholder="" onChange={handleInputChange('mobile')} />
                                </div>

                            </div>
                            <div className='createCompanyGroupBtn'>
                                <div className='cancelCreateCompanyBtn' onClick={closeCreateCompanyModal}>Cancelar</div>
                                <div className='createCompanyFormBtn' onClick={handleCreateCompany}>Crear</div>
                            </div>

                        </div>
                    </div>
                </div>
            </Modal>

            <Modal className='deleteCompanyModal' isOpen={deleteCompanyModal}>
                <div className='deleteCompanyModalContent'>
                    <div className='deleteCompanyModalHeader'>
                        Eliminar Empresa
                        <div className='closeModalBtn' onClick={closeDeleteCompanyModal}>&times;</div>
                    </div>
                    <div className='deleteCompanyModalFooter'>
                        <p>¿Deseas eliminar a {deleteCompanyName}?</p>
                        <div className='deleteCompanyModalButtons'>
                            <div onClick={handleDeleteCompany} className='deleteCompanyModalButton'>Confirmar</div>
                            <div onClick={closeDeleteCompanyModal} className='deleteCompanyModalButtonCancel'>Cancelar</div>
                        </div>
                    </div>
                </div>
            </Modal>

            <Modal className='updateCompanyModal' isOpen={updateCompanyModal}>
                <div className="updateCompanyModalContent">
                    <div className='updateCompanyModalHeader'>
                        Actualizar datos de la empresa
                        <div className='closeModalBtn' onClick={closeUpdateCompanyModal}>&times;</div>
                    </div>
                    <div className="updateCompanyModalFooter">
                        <div className='createCompanyForm'>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Nit
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('NIT')} value={updateCompanyData.NIT} />
                                </div>
                                <div className='createCompanyInput'>
                                    Nombre de la Empresa
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('company_name')} value={updateCompanyData.company_name} />
                                </div>
                                <div className='createCompanyInput'>
                                    Sigla
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('acronym')} value={updateCompanyData.acronym} />
                                </div>
                                <div className='createCompanyInput'>
                                    Estado de Afiliación
                                    <select type="text" placeholder="Selecciona un estado" onChange={handleInputChangeUpdate('affiliation_status')} value={updateCompanyData.affiliation_status}>
                                        <option value="1">Activo</option>
                                        <option value="2">Inactivo</option>
                                    </select>
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Fecha de Afiliación
                                    <input type="date" onChange={handleInputChangeUpdate('affiliation_date')} value={updateCompanyData.affiliation_date} />
                                </div>
                                <div className='createCompanyInput'>
                                    Fecha de Desafiliación
                                    <input type="date" placeholder="" onChange={handleInputChangeUpdate('affiliation_date')} value={updateCompanyData.disaffiliation_date} />
                                </div>
                                <div className='createCompanyInput'>
                                    Sector de la industria
                                    <select name="sector" id="sector" onChange={handleInputChangeUpdate('industry_sector')} value={updateCompanyData.industry_sector}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Plásticos</option>
                                        <option value="2">Química</option>
                                        <option value="3">Petroquímica y sus relacionados</option>
                                        <option value="4">Cauchos</option>
                                        <option value="5">Pinturas</option>
                                        <option value="6">Tintas y Recubrimientos</option>
                                        <option value="7">Fibras</option>
                                        <option value="8">Impresión 3D</option>
                                        <option value="9">Fabricantes digitales</option>
                                        <option value="10">Materiales Compuestos</option>
                                        <option value="11">Maquinaria y Equipos</option>
                                        <option value="12">Consultoría</option>
                                        <option value="13">Servicios</option>
                                    </select>

                                </div>
                                <div className='createCompanyInput'>
                                    ¿Es productor?
                                    <select name="select" id="select" onChange={handleInputChangeUpdate('is_producer')} value={updateCompanyData.is_producer}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Si</option>
                                        <option value="2">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    Actividad principal
                                    <input type="text" onChange={handleInputChangeUpdate('primary_activity')} value={updateCompanyData.primary_activity} />
                                </div>
                                <div className='createCompanyInput'>
                                    Actividad Secundaria
                                    <input type="text" onChange={handleInputChangeUpdate('secondary_activity')} value={updateCompanyData.secondary_activity} />
                                </div>
                                <div className='createCompanyInput'>
                                    Otras actividades
                                    <input type="text" onChange={handleInputChangeUpdate('other_activity_1')} value={updateCompanyData.other_activity_1} />
                                </div>
                                <div className='createCompanyInput'>
                                    Otras actividades
                                    <input type="text" onChange={handleInputChangeUpdate('other_activity_2')} value={updateCompanyData.other_activity_2} />
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    ¿Cúal es la naturaleza de sus operaciones?
                                    <select name="select" id="select" onChange={handleInputChangeUpdate('business_nature')} value={updateCompanyData.business_nature}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Nacional</option>
                                        <option value="2">Importación</option>
                                        <option value="3">Exportación</option>
                                    </select>
                                </div>
                                <div className='createCompanyInput'>
                                    Email institucional
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('institutional_email')} value={updateCompanyData.institutional_email} />
                                </div>
                                <div>
                                    Pagina web
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('website')} value={updateCompanyData.website} />
                                </div>
                                <div>
                                    ciudad
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('city')} value={updateCompanyData.city} />
                                </div>
                            </div>
                            <div className='createComapanyGroup'>
                                <div className='createCompanyInput'>
                                    tipo de direccion
                                    <select name="select" id="select" onChange={handleInputChangeUpdate('address_type')} value={updateCompanyData.address_type}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="1">Principal</option>
                                        <option value="2">Domicilio</option>
                                        <option value="3">otro</option>
                                    </select>
                                </div>
                                <div className='createCompanyInput'>
                                    Dirección
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('address')} value={updateCompanyData.address} />
                                </div>

                                <div className='createCompanyInput'>
                                    Telefono fijo
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('phone')} value={updateCompanyData.phone} />
                                </div>
                                <div className='createCompanyInput'>
                                    Telefono movil
                                    <input type="text" placeholder="" onChange={handleInputChangeUpdate('mobile')} value={updateCompanyData.mobile} />
                                </div>

                            </div>
                            <div className='createCompanyGroupBtn'>
                                <div className='cancelCreateCompanyBtn' onClick={closeUpdateCompanyModal}>Cancelar</div>
                                <div className='createCompanyFormBtn' onClick={handleUpdateCompany}>Actualizar</div>
                            </div>
                        </div>
                    </div>
                </div>

            </Modal>

            <Modal className='showUsers'>
                <div className='showUsersModal'>
                    <div className='showUsersModalHeader'></div>
                    <div className='showUsersModalContent'></div>
                </div>
            </Modal>


            <div className="mainCompaniesContainer">
                <div className="companiesWindowHeader">Panel de control de Empresas</div>
                <div className="companiesWindowHeaderContent">
                    <div className="companiesWindowHeaderContentLeft">
                        <p className='companiesWindowDescription'>Aquí encontrarás todas las empresas registradas en el sistema.</p>
                    </div>
                </div>
                <div className="companiesWindowFooterContent">
                    <div className="usersWindowContentMenu">
                        <div className='usersFilterContainer'>
                            <div className='usersFilter'>
                                <img src={Filter} alt="Filter" className='dashboardIcons' />
                                Filtro
                            </div>
                            <div>
                                <input type="text" placeholder="Buscar por Nombre" className='usersFilterInput' />
                            </div>
                        </div>

                        <div className='usersWindowContentMenuBtns'>
                            <div className='excelBtn'>
                                <img src={ExcelIcon} alt="Exportar a Excel" className='userActionsIcon' />
                            </div>

                            <div className='createCompanieBtn' onClick={openCreateCompanyModal}>
                                Añadir empresa
                            </div>
                        </div>

                    </div>
                    <div>
                        <table className='companiesTable'>
                            <thead>
                                <tr>
                                    <th>
                                        <div className='menuItemContainer'>
                                            NIT
                                        </div>
                                    </th>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Fecha de Afiliación</th>
                                    <th>Estado de afiliación</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {companies.map(company => (
                                    <tr key={company.id}>
                                        <td>
                                            <div className='menuItemContainer'>
                                                {company.NIT}
                                            </div>
                                        </td>
                                        <td>{company.company_name}</td>
                                        <td>{company.institutional_email}</td>
                                        <td>{new Date(company.affiliation_date).toLocaleDateString()}</td>
                                        <td>{company.affiliation_status === 1 ? <div className='afiliatedCompanie'>Afiliado</div> : <div className='notAffiliatedCompanie'>No Afiliado</div>}</td>
                                        <td>
                                            <div className='userActions'>
                                                <div className='excelBtn'>
                                                    <img src={UsersIcon} alt="Exportar a Excel" className='userActionsIcon' />
                                                </div>
                                                <div className='editCompanyBtn' onClick={() => {
                                                    setUpdateCompanyData(company);
                                                    openUpdateCompanyModal();
                                                }}>
                                                    <img src={EditIcon} alt="Editar Empresa" className='userActionsIcon' />
                                                </div>
                                                <div className='deleteCompanyBtn' onClick={() => {
                                                    setDeleteCompanyData(company.id); // Establece la empresa a eliminar
                                                    openDeleteCompanyModal();
                                                    setDeleteCompanyName(company.company_name); // Establece el nombre de la empresa a eliminar
                                                }}>
                                                    <img src={TrashIcon} alt="Eliminar Empresa" className='userActionsIcon' />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Companies;
