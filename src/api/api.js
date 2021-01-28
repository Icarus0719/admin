import * as account from './api.account'
import * as board from './api.board'
import * as dept from './api.dept'
import * as dictionary from './api.dictionary'
import * as file from './api.file'
import * as notice from './api.notice'
import * as rent from './api.rent'
import * as role from './api.role'
import * as Static from './api.static'
import * as user from './api.user'
export default {
  ...account,
  ...board,
  ...dept,
  ...dictionary,
  ...file,
  ...notice,
  ...rent,
  ...role,
  ...Static,
  ...user,
}