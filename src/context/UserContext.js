import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext();
const DEFAULT_AVATAR = 'https://ui-avatars.com/api/?name=User&background=random';

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    setError('');
    fetch('https://randomuser.me/api/?results=20')
      .then((response) => response.json())
      .then((data) => {
        const normalizedData = data.results.map((item) => ({
          id: item.login.uuid,
          firstName: item.name.first,
          lastName: item.name.last,
          email: item.email,
          phone: item.phone,
          picture: item.picture.medium,
          gender: item.gender,
          isFavorite: false,
        }));
        setUsers(normalizedData);
      })
      .catch(() => setError('Kullanıcılar yüklenirken bir hata oluştu.'))
      .finally(() => setLoading(false));
  };

  const addUser = (newUser) => {
    const userWithDefaults = {
      id: Date.now().toString(),
      picture: DEFAULT_AVATAR,
      gender: 'unknown',
      isFavorite: false,
      ...newUser,
    };
    setUsers((prev) => [userWithDefaults, ...prev]);
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const toggleFavorite = (id) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, isFavorite: !user.isFavorite } : user))
    );
  };

  return (
    <UserContext.Provider value={{ users, loading, error, fetchUsers, addUser, updateUser, deleteUser, toggleFavorite }}>
      {children}
    </UserContext.Provider>
  );
};