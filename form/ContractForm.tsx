'use client';

import AutoForm, { AutoFormSubmit } from '@/components/ui/auto-form';
import { createConfig, createDynamicSchema } from '@/lib/parser';
import { Cookie } from 'next/font/google';
import { z } from 'zod';

export const ContractFrom = async () => {
  const ex = {
    inputs: [
      {
        inputs: [],
        type: 'TEXT',
        description: '',
        name: 'name',
        multiple: false,
      },
      {
        inputs: [],
        type: 'LOCALDATETIME',
        description: null,
        name: 'birthday',
        multiple: false,
      },
      {
        inputs: [],
        type: 'INTEGER',
        description: null,
        name: 'number',
        multiple: false,
      },
    ],
    constraints: [],
  };

  const complexContrat = {
    inputs: [
      {
        inputs: [
          {
            inputs: [],
            type: 'TEXT',
            description: null,
            name: 'firstName',
            multiple: false,
          },
          {
            inputs: [],
            type: 'TEXT',
            description: null,
            name: 'lastName',
            multiple: false,
          },
          {
            inputs: [],
            type: 'LOCALDATETIME',
            description: 'Date of birth',
            name: 'birthday',
            multiple: false,
          },
          {
            inputs: [],
            type: 'INTEGER',
            description: 'Your favorite number',
            name: 'favoriteNumber',
            multiple: false,
          },
          {
            inputs: [],
            type: 'TEXT',
            description: 'Your favorite color',
            name: 'favoriteColor',
            multiple: false,
          },
          {
            inputs: [],
            type: 'BOOLEAN',
            description: null,
            name: 'isVegan',
            multiple: false,
          },
        ],
        type: null,
        description: 'A people object',
        name: 'peopleInput',
        multiple: false,
      },
      {
        inputs: [],
        type: 'TEXT',
        description: 'A fake description',
        name: 'comments',
        multiple: false,
      },
    ],
    constraints: [],
  };

  // loginToBonita().then((response) => {
  //   console.log('loginResponse', response);
  //   const contract = getBonitaContrat(6386697718195341283).then((response) => {
  //     console.log('contract', response);
  //   });
  // });
  // listProcess(4800412777038354122).then((response) => {
  //   console.log('contract', response);
  // });

  // getBonitaContrat(4800412777038354122).then((response) => {
  //   console.log('contract', response);
  // });

  // loginToBonita().then((token) => {
  //   console.log('token', token);
  //   var myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');
  //   myHeaders.append('mode', 'cors');
  // myHeaders.append(
  //   'X-Bonita-API-Token',
  //   token || '179733f7-3e9c-4d8f-ac16-f9fb968efeb2'
  // );
  // const contract = getBonitaContrat(9113453063022293883);
  // console.log(contract);
  // const processes = listProcess();
  // });

  const formSchema = createDynamicSchema(complexContrat);

  const fieldConfig = createConfig(complexContrat);
  // const token = loginToBonita().then((token) => {
  //   console.log(token);
  //   return token;
  // });
  // console.log('token', token);
  function onSubmit(data: any) {
    // loginToBonita().then((token) => {
    //   console.log('token', token);
    //   var myHeaders = new Headers();
    //   myHeaders.append('Content-Type', 'application/json');
    //   myHeaders.append(
    //     'X-Bonita-API-Token',
    //     token || 'db10edcf-ff69-413a-a407-64dabb22292b'
    //   );
    //   fetch(
    //     'http://localhost:8080/bonita/API/bpm/process/9113453063022293883/instantiation',
    //     {
    //       method: 'POST',
    //       headers: myHeaders,
    //       body: JSON.stringify(data),
    //     }
    //   );
    // });
    console.log('submit', data);
  }

  return (
    <AutoForm
      formSchema={formSchema}
      fieldConfig={fieldConfig}
      onSubmit={onSubmit}
    >
      <AutoFormSubmit />
    </AutoForm>
  );
};
