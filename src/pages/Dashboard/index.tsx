import React, { FormEvent, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import api from '../../services/api';

import { Error, Form, Repositories, Title } from './styles';

interface Repository {
  description: string;
  full_name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const Dashboard: React.FC = () => {
  const [inputError, setInputError] = useState('');
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storedRepositories = localStorage.getItem(
      '@GitHubExplorer:repositories',
    );

    if (storedRepositories) {
      return JSON.parse(storedRepositories);
    }

    return [];
  });

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('You must inform the author/repository name');

      return;
    }

    try {
      const response = await api.get<Repository>(`/repos/${newRepo}`);

      const repository = response.data;

      setInputError('');
      setNewRepo('');
      setRepositories([...repositories, repository]);
    } catch (error) {
      setInputError(`Unable to find ${newRepo}`);
    }
  }

  useEffect(() => {
    localStorage.setItem(
      '@GitHubExplorer:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  return (
    <>
      <img src={logoImage} alt="GitHub Explorer" />
      <Title>Explore GitHub repositories.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Type the author/repository name"
          value={newRepo}
        />
        <button type="submit">Search</button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map(repository => (
          <a href="test" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />

            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
