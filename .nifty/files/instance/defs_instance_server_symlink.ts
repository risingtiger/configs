

export type MachineCoreT = {
    machine_id: number,
	logistics_machineid: string,
    dispenser_mode: 'none'|'lora'|'switch'|'discrete',
    lora_version: number,  
    meters_tally: number[], //length of 5 
    meters_reconciles: {deltas:number[],ts:number}[]
    incrs: number[], //length of 5
    state_active: boolean,
    state_condition: string,
    state_latest: string,
    state_mia: boolean,
    timezone: string,
    lastcall: number,
	firestore_refid: string,
    chip_id: number,
    store_id: number,
    machinets: number
}

export type StoreT = {
    store_id: number,
    logistics_storeid: string,
    logistics_pwtdataid: string,
    logistics_nationalwaterid: string,
    store_brand: string,
	storegps:number[],
    address: string,
    city: string,
    state: string,
    zip: string,
    store_description: string,
	storets: number,
}

export type ChipT = {
    chip_id: number,
    logistics_chipid: string,
    codeversion: string,
	cellsignal: number[], // strength, quality
    cellgps: number[],
    chipgps: number[], 
    particle_id: string,
    particle_account: string,
    particle_product: number,
    particle_serial: string,
	particle_development: boolean,
	chipts: number,
}

export type MachineT = MachineCoreT & StoreT & ChipT



export type MachineFirestoreT = {
    id: string,
    cell: Array<number>,
    chip: string,
    dispenser: { lora_version: number, mode: MachineDispenserModeE },
    cellgps: Array<number>,
    incrs: Array<number>,
    lastcall: number,
    machineid: string,
    meters_tally: Array<number>,
    meters_reconciles: {deltas:number[],ts:number}[],
    particle: MachineFParticleT,
    pwtdataid: string,
    state: MachineFStateT,
    store: MachineFStoreT,
	storedoc: string|null,
    timezone: string,
    ts: number
} 
export type MachineFParticleT = {
	account: string,
    id: string,
    codeversion: string
    product: number,
    serial: string,
} 
export type MachineFStoreT = {
    id: string,
	brand: string|null,
    city: string,
    latlon: Array<number>,
    desc: string,
    state: string,
    zip: string
} 
export type MachineFStateT = {
    active: boolean,
    mia: boolean,
	latest: string,
	condition: "ok"|"err"|"warn"
} 








// !!! SHARED between web app and lambda. I REALLY need to resolve this and somehow use typescript to consolidate on one definition file

export const enum MachineDispenserModeE { OnLoRa, OnSwitchingDiscrete, OnDiscrete } 

//TODO: this is bullshit! hardcoding strings like this to a typescript type. Its already causing pain across the code base

export type MachineStatusBits = {
	procpwr   : { type: 'err',  state: boolean, errmsg: 'Power Out', errmsg_long: 'Power is out', priority: 100 },
	drppan    : { type: 'err',  state: boolean, errmsg: 'Drip Pan', errmsg_long: 'Drip pan is not in place', priority: 200 },
	tnklvl    : { type: 'err',  state: boolean, errmsg: 'Tank Level', errmsg_long: 'Tank level is too low', priority: 300 },
	smpovr1   : { type: 'err',  state: boolean, errmsg: 'Sump Over', errmsg_long: 'Sample over', priority: 310 },
	smpovr2   : { type: 'err',  state: boolean, errmsg: 'Sump Over 2', errmsg_long: 'Sample over 2', priority: 311 },
	smprunalrt: { type: 'err',  state: boolean, errmsg: 'Sump Shutdown', errmsg_long: 'Sump Shutdown', priority: 331 },
	uvblb1    : { type: 'err',  state: boolean, errmsg: 'UV Bulb 1', errmsg_long: 'UV bulb 1 is not functioning', priority: 370 },
	uvblb2    : { type: 'err',  state: boolean, errmsg: 'UV Bulb 2', errmsg_long: 'UV bulb 2 is not functioning', priority: 371 },
	mmpexcycl : { type: 'err',  state: boolean, errmsg: 'MMP Cycles', errmsg_long: 'M Pump Cycling Too Often', priority: 380 },
	loramia   : { type: 'err',  state: boolean, errmsg: 'Lora Mia', errmsg_long: 'Lora Mia Error', priority: 385 },
	dsppwr1   : { type: 'warn', state: boolean, errmsg: 'Dispenser Power Out', errmsg_long: 'Dispenser Power Out', priority: 800 },
	smprun    : { type: 'warn', state: boolean, errmsg: 'Sump Timeout', errmsg_long: 'Sump Timeout', priority: 430 },
	afltlw    : { type: 'warn', state: boolean, errmsg: 'After Filter Low', errmsg_long: 'After filter is low', priority: 450 },
	nzl1      : { type: 'warn', state: boolean, errmsg: 'Nozzle Timeout', errmsg_long: 'Nozzle 1 timed out', priority: 600 },
	nzl2      : { type: 'warn', state: boolean, errmsg: 'Nozzle Timeout', errmsg_long: 'Nozzle 2 timed out', priority: 601 },
	srvdr1    : { type: 'info', state: boolean, errmsg: 'Door Open', errmsg_long: 'Door is Open', priority: 700 },
	srvdr2    : { type: 'info', state: boolean, errmsg: 'Door 2 Open', errmsg_long: 'Door 2 is Open', priority: 701 },
}

export const enum MachineStatusTagTypeE { STANDARD, STARTUP } // this is tied all the way to the embedded code uint8_t value 0 and 1 and eventually 2 3 etc etc




