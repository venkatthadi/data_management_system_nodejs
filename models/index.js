import Accounts from "./account.model.js";
import Networks from "./network.model.js";
import Schools from "./school.model.js";
import Usertypes from "./usertype.model.js";
import Users from "./user.model.js";

Accounts.hasMany(Networks, { onDelete: 'CASCADE' })

Networks.belongsTo(Accounts)
Networks.hasMany(Schools, { onDelete: 'CASCADE' })

Schools.belongsTo(Networks)
Schools.hasMany(Users, { onDelete: 'CASCADE' })

Usertypes.hasMany(Users, { onDelete: 'CASCADE' })

Users.belongsTo(Schools)
Users.belongsTo(Usertypes)

export { Accounts, Networks, Schools, Usertypes, Users }