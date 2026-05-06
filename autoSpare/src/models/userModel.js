class User{
    constructor(id, full_name, email, password_hash, role, created_date, updated_date, is_active){
        this.id = id;
        this.full_name = full_name;
        this.email = email;
        this.password_hash = password_hash;
        this.role = role;
        this.created_date = created_date;
        this.updated_date = updated_date;
        this.is_active = is_active;
    }
}

module.exports = User;