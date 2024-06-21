const ALERT_TYPE = {
  WARN: 'advertencia',
  SUCCESS: 'éxito',
  ERROR: 'error',
  TIME: 3500
};


const TIME = {
  DATE:'yyyy-MM-dd',
  DATE_TIME:'yyyy-MM-dd HH:mm',
  TIME: 'HH:mm'
}

const message = {
  CONTACT_ADMIN: 'Por favor comuníquese con el Administrador.',
  ERROR: 'Ha ocurrido un error.',
};

const ERROR_CODE_MESSAGES : any = {
  0: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.',
  401: 'Estimado Cliente, el acceso no está autorizado.',
  403: 'Estimado Cliente, el acceso no está autorizado.',
  404: 'Estimado Cliente, la información solicitada no está disponible.',
  409: 'Estimado Cliente, El registro ya existe en la base de datos.',
  406: 'Estimado Cliente, la petición solicitada no está permitida',
  405: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.',
  408: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.',
  500: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.',
  502: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.',
  503: 'Estimado Cliente, el servicio no se encuentra disponible. Intente más tarde.'
};





const ESTADO_SI_NO = {
  SI:'S',
  NO:'N'
}


const COMPONENT_TYPE = {
  CHECKBOX: 'checkbox',
  INPUT: 'input',
  DROPDOWN: 'dropdown',
  DATE: 'date',
  DATE_HOUR: 'dateHour',
  HOUR_MINUTES: 'hourMinutes',
  NO_TYPE: 'noType',
  MONEY: 'money',
};

const REPORT_TYPE={
  TYPE_PDF:'TYPE_PDF',
  TYPE_XLS:'TYPE_XLS',
  TYPE_PDF_PRINT:'TYPE_PDF_PRINT'
}


export {
  ALERT_TYPE,
  message,
  ERROR_CODE_MESSAGES,
  TIME,
  COMPONENT_TYPE,
  REPORT_TYPE,
  ESTADO_SI_NO,
};
