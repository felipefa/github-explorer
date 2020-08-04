import React, { FormEvent, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import api from '../../services/api';

import { Form, Repositories, Title } from './styles';

interface Repository {
  description: string;
  full_name: string;
  owner: {
    avatar_url: string;
    login: string;
  };
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Repository>(`/repos/${newRepo}`);

    const repository = response.data;

    setNewRepo('');
    setRepositories([...repositories, repository]);
  }

  return (
    <>
      <img src={logoImage} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form onSubmit={handleAddRepository}>
        <input
          onChange={e => setNewRepo(e.target.value)}
          placeholder="Digite o nome do repositório"
          value={newRepo}
        />
        <button type="submit">Pesquisar</button>
      </Form>

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
