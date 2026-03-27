import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const messages = await req.context.models.Message.findAll();
    return res.status(200).json(messages);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );

    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const message = await req.context.models.Message.create({
      text: req.body.text,
      userId: req.context.me.id,
    });

    return res.status(201).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.put("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );

    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }

    await message.update({
      text: req.body.text,
    });

    return res.status(200).json(message);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.delete("/:messageId", async (req, res) => {
  try {
    const message = await req.context.models.Message.findByPk(
      req.params.messageId,
    );

    if (!message) {
      return res.status(404).json({ message: "Mensagem não encontrada" });
    }

    await message.destroy();

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
});

export default router;
