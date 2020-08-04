import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import logoImage from '../../assets/logo.svg';

import { Form, Repositories, Title } from './styles';

const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logoImage} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form>
        <input placeholder="Digite o nome do repositório" />
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/12715851?s=460&u=dd3a9f01bafe91c5ac12171f2431f40c382ec4ed&v=4"
            alt="Felipe"
          />

          <div>
            <strong>felipefa/github-explorer</strong>
            <p>Testing</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/12715851?s=460&u=dd3a9f01bafe91c5ac12171f2431f40c382ec4ed&v=4"
            alt="Felipe"
          />

          <div>
            <strong>felipefa/github-explorer</strong>
            <p>Testing</p>
          </div>

          <FiChevronRight size={20} />
        </a>
        <a href="test">
          <img
            src="https://avatars0.githubusercontent.com/u/12715851?s=460&u=dd3a9f01bafe91c5ac12171f2431f40c382ec4ed&v=4"
            alt="Felipe"
          />

          <div>
            <strong>felipefa/github-explorer</strong>
            <p>Testing</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>
    </>
  );
};

export default Dashboard;
