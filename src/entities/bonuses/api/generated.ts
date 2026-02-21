import { workBaseApi as api } from '../../../shared/api/workBaseApi'
const injectedRtkApi = api.injectEndpoints({
	endpoints: () => ({}),
	overrideExisting: false,
})
export { injectedRtkApi as bonusesApi }
