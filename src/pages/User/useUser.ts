import { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useParams, redirect } from 'react-router-dom'
import { ServiceActionsContext } from '../../Contexts/ServiceContext';
import { ToasterActionsContext } from '../../Contexts/ToasterContext';

export const useUser = () => {
  const signal = axios.CancelToken.source();
  const { getAxios } = useContext(ServiceActionsContext);
  const { addToastr } = useContext(ToasterActionsContext);
  const {username} = useParams();

  const [userData, setUserData] = useState({});
  const [userRepos, setUserRepos] = useState([]);

  const fetchUserData = async () => {
    const query = `users/${username}`;
    try {
      const { data } = await getAxios(query, signal.token);
      setUserData(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      addToastr("Failed", error.response?.data.message, "danger");
      } else {
        throw error;
      }
    }
    return false;
  }

  const fetchUserRepos = async () => {
    const query = `users/${username}/repos?per_page=10`;
    try {
      const { data } = await getAxios(query, signal.token);
      setUserRepos(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
      addToastr("Failed", error.response?.data.message, "danger");
      } else {
        throw error;
      }
    }
    return false;
  }

  useEffect(() => {
    if(!!username) {
      fetchUserData();
      fetchUserRepos();
    }

    redirect("/");
    
  }, [])

  const userValue: any = {
    userData,
    userRepos
  }

  return userValue
}