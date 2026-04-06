class Task {
  constructor({ id = null, title, description = '', status = 'pending', createdAt = null }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.createdAt = createdAt;
  }

  static fromDb(row) {
    if (!row) {
      return null;
    }

    return new Task({
      id: row.id,
      title: row.title,
      description: row.description,
      status: row.status,
      createdAt: row.created_at
    });
  }

  toPersistence() {
    return {
      title: this.title,
      description: this.description,
      status: this.status
    };
  }
}

module.exports = { Task };
