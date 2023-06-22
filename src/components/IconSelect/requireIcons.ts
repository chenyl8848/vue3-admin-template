// const files = require.context('./', false, /.vue$/).keys();
const files: Array<any> = import.meta.glob('@/assets/icons/*.svg')
const iconList: Array<string> = []
for (let file in files) {
  let fileName = file.substring(file.lastIndexOf('/') + 1)
  iconList.push(fileName.split('.')[0])
}
export default iconList
