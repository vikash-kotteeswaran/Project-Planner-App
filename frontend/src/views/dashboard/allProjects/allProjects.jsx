import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { getAllProjects, searchProjects, searchProjectsLength } from '../../../controllers/redux/allProjectSlice';
import Sidebar from '../sidebar/sidebar';
import './allProjects.css';

const AllProjects = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchText, setSearchText] = useState({
        value: '',
        field: 'id',
        start: 0,
        pageCount: 15,
        prevPageCount: 0
    });

    useEffect(() => {
        if(searchText.prevPageCount <= projects.projectsLength || searchText.pageCount <= projects.projectsLength) {
            dispatch(searchProjects(searchText));
        }
    }, [searchText, dispatch]);

    const projects = useSelector(state => state.allProjects);
    const userId = useSelector(state => state.auth.userId);

    useEffect(() => {
        dispatch(searchProjectsLength(searchText));
        setSearchText({
            ...searchText,
            start: 0
        });
    }, [searchText.value, searchText.field, dispatch]);

    const gotoProject = (event) => {
        const id = event.currentTarget.id;
        const project = projects.allProjects.filter(project => project.projectId == id)[0]

        navigate(`/project/${id}`, {state:{project:project, userId:userId}});
    }

    const allProjectsTable = () => {
        const allProjectsRows = [];

        for(let project of projects.allProjects) {
            allProjectsRows.push(
                <div className='all-projects-table-row' id={project.projectId} onClick={gotoProject}>
                    <div className='all-projects-table-row-projectId all-projects-table-row-element'>{project.projectId}</div>
                    <div className='all-projects-table-row-title all-projects-table-row-element'>{project.title}</div>
                    <div className='all-projects-table-row-status all-projects-table-row-element'>{project.status}</div>
                    <div className='all-projects-table-row-creator all-projects-table-row-element'>{project.creator}</div>
                    <div className='all-projects-table-row-createdDate all-projects-table-row-element'>{project.createdDate.slice(0, -5).replace('T', ' at ')}</div>
                </div>
            );
        };

        return (
            <div className='all-projects-table'>
                <div className='all-projects-table-head'>
                    <div className='all-projects-table-head-projectId all-projects-table-head-element'>Id</div>
                    <div className='all-projects-table-head-title all-projects-table-head-element'>Title</div>
                    <div className='all-projects-table-head-status all-projects-table-head-element'>Status</div>
                    <div className='all-projects-table-head-creator all-projects-table-head-element'>Creator</div>
                    <div className='all-projects-table-head-createdDate all-projects-table-head-element'>Created Date</div>
                </div>
                {allProjectsRows}
            </div>
        );
    };


    const handleValueChange = (event) => {
        event.preventDefault();
        setSearchText({
            ...searchText,
            value: event.target.value
        });
    }

    const handleFieldChange = (event) => {
        event.preventDefault();
        setSearchText({
            ...searchText,
            field: event.target.value
        });
    };
    
    const handlePageCountChange = (event) => {
        event.preventDefault();
        setSearchText({
            ...searchText,
            pageCount: event.target.value,
            prevPageCount: searchText.pageCount
        });
    };

    const handlePrevPage = async () => {
        if(currentPage >= 1) {
            setSearchText({
                ...searchText,
                start: searchText.start - searchText.pageCount
            });
        }

        console.log('prev');
    };

    const handleNextPage = async () => {

        if(currentPage < totalPages) {
            setSearchText({
                ...searchText,
                start: searchText.start + searchText.pageCount
            });
        }
        console.log('next');
    };

    const submitSearch = async (event) => {
        event.preventDefault();
        console.log(searchText);
        await dispatch(searchProjects(searchText));
    };

    const currentPage = Math.floor(searchText.start/searchText.pageCount);
    const totalPages = Math.floor(projects.projectsLength/searchText.pageCount);

    return (
        <div className='main-div'>
            <Sidebar currentView={'projects'}/>
            <div className='all-projects-header'><h1>ALL PROJECTS</h1></div>
            <div className='all-projects-main'>
                <div className='all-project-table-operations'>
                    <div className='all-project-row-per-page-setter'>
                        <span>Rows per page</span>
                        <select className='all-project-row-per-page' value={searchText.pageCount} onChange={handlePageCountChange}>
                            {/* <option className='all-project-row-per-page-option' value={2}>rows per page</option> */}
                            <option className='all-project-row-per-page-option' value={2}>2</option>
                            <option className='all-project-row-per-page-option' value={5}>5</option>
                            <option className='all-project-row-per-page-option' value={10}>10</option>
                            <option className='all-project-row-per-page-option' value={15}>15</option>
                            <option className='all-project-row-per-page-option' value={25}>25</option>
                        </select>
                    </div>
                    <div className='all-project-search-element'>
                        <input className='all-project-search-bar' placeholder='search by name' value={searchText.value} onChange={handleValueChange}></input>
                        <select className='all-project-select-search-field' value={searchText.field} onChange={handleFieldChange}>
                            <option className='all-project-select-search-field-option' value={'id'}>Id</option>
                            <option className='all-project-select-search-field-option' value={'title'}>Title</option>
                            <option className='all-project-select-search-field-option' value={'status'}>Status</option>
                            <option className='all-project-select-search-field-option' value={'admin'}>Creator</option>
                            <option className='all-project-select-search-field-option' value={'createdDate'}>Created Date</option>
                        </select>
                        {/* <button className='all-project-search-button' onClick={submitSearch}>Search</button> */}
                    </div>
                </div>
                {allProjectsTable()}
            </div>

            <div className='all-project-change-page'>
                
                {
                    currentPage == 0? 
                    <div className='all-project-prev-page-left-end'><i class="fa fa-chevron-circle-left"></i></div> : 
                    <div className='all-project-prev-page all-project-page-changer' onClick={handlePrevPage}><i class="fa fa-chevron-circle-left"></i></div>
                }
                <div className='all-project-page-number'>{searchText.start/searchText.pageCount + 1}</div>
                {
                    currentPage == totalPages? 
                    <div className='all-project-next-page-right-end'><i class="fa fa-chevron-circle-right"></i></div> : 
                    <div className='all-project-next-page all-project-page-changer' onClick={handleNextPage}><i class="fa fa-chevron-circle-right"></i></div>
                }
            </div>
        </div>
    );
};

export default AllProjects;