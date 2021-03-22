import defaultSettings from '@/settings'

const title = defaultSettings.title || '湖北分公司运营管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
