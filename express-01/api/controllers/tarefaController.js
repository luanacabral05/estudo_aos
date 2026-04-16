import { tarefaService } from "../services";

const getTarefas = async (req, res) => {
  const tarefas = await tarefaService.getAllTarefas();
  return res.status(200).send(tarefas);
};

const getTarefa = async (req, res) => {
  const tarefa = await tarefaService.getTarefaById(req.params.objectId);

  if (!tarefa) {
    return res.status(404).send();
  }

  return res.status(200).send(tarefa);
};

const createTarefa = async (req, res) => {
  if (!req.body.descricao) {
    return res.status(400).send({ error: "O campo descricao é obrigatório." });
  }

  const tarefa = await tarefaService.createTarefa({
    descricao: req.body.descricao,
    concluida: req.body.concluida ?? false,
  });

  return res.status(201).send(tarefa);
};

const updateTarefa = async (req, res) => {
  const response = await tarefaService.updateTarefa(req.params.objectId, {
    descricao: req.body.descricao,
    concluida: req.body.concluida,
  });

  if (response[0] === 0) {
    return res.status(404).send();
  }

  const tarefa = response[1][0];
  return res.status(200).send(tarefa);
};

const deleteTarefa = async (req, res) => {
  const result = await tarefaService.deleteTarefa(req.params.objectId);

  if (!result) {
    return res.status(404).send();
  }

  return res.status(204).send();
};

export default {
  getTarefas,
  getTarefa,
  createTarefa,
  updateTarefa,
  deleteTarefa,
};
