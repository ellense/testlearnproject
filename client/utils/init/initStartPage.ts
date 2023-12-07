import { startPage } from '~/utils/init/startPage'
const initPage = (() => {
  return {
    init: () => {
      const getStartPage: string | undefined = startPage()

      if (getStartPage) {
        useRouter().push(getStartPage)
      }
    },
  }
})()

export default initPage
