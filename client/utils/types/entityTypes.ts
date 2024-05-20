////////////////////////////////// юр.лица //////////////////////////////////////////
export interface IEntity {
    entity_id: string;
    director_name: string;
    urastic_name: string;
    name: string;
    urastic_address: string;
    merge_id: string;
  }
  export interface IEntityFull {
    entity_id: string;
    director_name: string;
    urastic_name: string;
    name: string;
    urastic_address: string;
    inn_kpp: string;
    bank_name: string;
    account: string;
    corr_account: string;
    bank_bink: string;
    merge_id: string;
  }
  export interface IParamEntities {
    search?: string;
  }
  export interface IEntityInKu {
    entity_id: string;
    name: string;
    merge_id: string;
  }
  export interface IEntityIdAndNameForKu {
    entity_id: string[];
    entity_name: string;
  }
  export interface EntityId {
    entity_id: string;
  }