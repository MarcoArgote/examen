const { supabase } = require('../config/db');
const { Task } = require('../models/taskModel');

const TABLE = 'tasks';

class TaskRepository {
  async findAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(`Error al consultar tareas: ${error.message}`);
    }

    return data.map((row) => Task.fromDb(row));
  }

  async findById(id) {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al buscar tarea: ${error.message}`);
    }

    return Task.fromDb(data);
  }

  async create(task) {
    const payload = task.toPersistence();

    const { data, error } = await supabase
      .from(TABLE)
      .insert(payload)
      .select('*')
      .single();

    if (error) {
      throw new Error(`Error al crear tarea: ${error.message}`);
    }

    return Task.fromDb(data);
  }

  async update(id, fields) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(fields)
      .eq('id', id)
      .select('*')
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw new Error(`Error al actualizar tarea: ${error.message}`);
    }

    return Task.fromDb(data);
  }

  async remove(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id);

    if (error) {
      throw new Error(`Error al eliminar tarea: ${error.message}`);
    }

    return true;
  }
}

module.exports = { TaskRepository };
