import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrashAlt } from "react-icons/fa";
import style from "./Main.module.css";

export function MainList() {
  const [tarefas, setTarefas] = useState([]);
  const [newTarefas, setNewTarefas] = useState("");

  function handlerTarefa(event) {
    event.preventDefault();
    setTarefas([
      ...tarefas,
      {
        id: uuidv4(),
        content: newTarefas,
        isContent: false,
      },
    ]);
    setNewTarefas("");
  }
  function handlerChange(event) {
    event.target.setCustomValidity("");
    setNewTarefas(event.target.value);
  }
  function handlerDeleteTarefas(id) {
    const hasDelete = tarefas.filter((tarefas) => {
      return tarefas.id !== id;
    });
    setTarefas(hasDelete);
  }
  function handlerCheckedTarefas(id) {
    setTarefas(
      tarefas.map((t) => ({
        ...t,
        isContent: t.id === id ? !t.isContent : t.isContent,
      }))
    );
  }
  function handlerInvalidity(event) {
    event.target.setCustomValidity("Adicione uma tarefa");
  }
  const isTarefaTolist = newTarefas.length === 0;

  return (
    <div className={style.criarTarefas}>
      <form onSubmit={handlerTarefa} className={style.form}>
        <input
          type="text"
          value={newTarefas}
          onChange={handlerChange}
          onInvalid={handlerInvalidity}
          required
          placeholder="Adicione uma nova tarefa"
        />
        <button type="submit" disabled={isTarefaTolist}>
          Criar
        </button>
      </form>
      <div className={style.countTarefas}>
        <strong>Tarefas criadas : {tarefas.length}</strong>
        <strong>
          Tarefas concluídas : {tarefas.filter((t) => t.isContent).length} de{" "}
          {tarefas.length}
        </strong>
      </div>
      <div className={style.listTarefas}>
        {tarefas.length === 0 ? (
          <h3 className={style.testo}>Não há tarefas ... </h3>
        ) : (
          tarefas.map((taref) => {
            return (
              <div className={style.feitas} key={taref.id}>
                <input
                  type="checkbox"
                  value={taref.isContent}
                  onChange={() => handlerCheckedTarefas(taref.id)}
                />
                <p>{taref.content}</p>
                <button onClick={() => handlerDeleteTarefas(taref.id)}>
                  <FaTrashAlt />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
