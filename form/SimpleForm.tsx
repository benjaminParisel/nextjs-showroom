'use client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { BonitaHelper } from '@/lib/BonitaHelper';
import { Process, ProcessSchema } from '@/lib/BonitaSchema';
import { useEffect, useState } from 'react';

const SimpleForm = () => {
  const [processes, setProcesses] = useState<Process[] | null>([]);

  useEffect(() => {
    const getData = async () => {
      const bonita = new BonitaHelper('walter.bates', 'bpm');
      await bonita.login();
      const query = await bonita.getProcess();
      const results = await query.json();
      const processes = ProcessSchema.parse(results);
      setProcesses(processes);
    };
    getData();
  }, []);

  return (
    <div className="max-w-lg mx-auto">
      <Table>
        <TableCaption>A list of your process</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Last update date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes &&
            processes.length &&
            processes.map((process) => {
              return (
                <TableRow key={process.id}>
                  <TableCell className="font-medium">
                    {process.displayName}
                  </TableCell>
                  <TableCell>{process.version}</TableCell>
                  <TableCell>{process.description}</TableCell>
                  <TableCell className="text-right">
                    {process.last_update_date}
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default SimpleForm;
