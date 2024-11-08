
const Tasks = Object.freeze({
    getUsers: 'getUsers',
    manageAdminUsers: 'manageAdminUsers',
    getRegisterVendors: 'getRegisterVendors',
    getVendorUsers: 'getVendorUsers',
    manageVendorUsers: 'manageVendorUsers',
    manageVendors: 'manageVendors',
    getVendors: 'getVendors',
    checkVendorAssigned: 'checkVendorAssigned',
    applyVendorship: 'applyVendorship',
    updateVendor: 'updateVendor',
    general: 'general',
    uploadFile: 'uploadFile',
    accecptVendor: 'accecptVendor',
    AppCoreConfig: 'AppCoreConfig',
    createTournament: 'createTournament',
    manageTournaments: 'manageTournaments',
    manageCalendar: 'manageCalendar',
    listCalendarEvents: 'listCalendarEvents',
    listTournaments: 'listTournaments',
    viewTournament: 'viewTournament',
    updateTournament: 'updateTournament',
    approveTournament: 'approveTournament',
    inviteVendorAdminUser:'inviteVendorAdminUser',


    igl: 'igl',
    teamOwner: 'teamOwner',
    teamManager: 'teamManager',
    teamPlayer: 'teamPlayer',
    teamSubstitute: 'teamSubstitute',
    
    teamJoinRequest: 'teamJoinRequest',  
    teamCreate : 'teamCreate',
    teamUpdate : 'teamUpdate',
    teamDelete: 'teamDelete',
    teamList: 'teamList',
    teamView: 'teamView',

  });
  
  const Roles = Object.freeze({
    vendor_super_admin: 'vendor_super_admin',
    vendor_manager: 'vendor_manager',
    vendor_assistant_manager: 'vendor_assistant_manager',
    vendor_creative_manager: 'vendor_creative_manager',
    vendor_admin: 'vendor_admin',
  
    admin: 'admin',
    super_admin: 'super_admin',
    admin_manager: 'admin_manager',
    admin_creative_manager: 'admin_creative_manager',

    igl: 'igl',
    team_owner: 'team_owner',
    team_manager: 'team_manager',
    team_player: 'team_player',
    team_substitute: 'team_substitute',


  });

  const VendorRoles = Object.freeze({
    vendor_super_admin: 'vendor_super_admin',
    vendor_manager: 'vendor_manager',
    vendor_assistant_manager: 'vendor_assistant_manager',
    vendor_creative_manager: 'vendor_creative_manager',
    vendor_admin: 'vendor_admin',
  });
  
  const AdminRoles = Object.freeze({
    
    admin: 'admin',
    super_admin: 'super_admin',
    admin_manager: 'admin_manager',
    admin_creative_manager: 'admin_creative_manager',
  });

  const TeamRoles = Object.freeze({
    igl: 'igl',
    team_owner: 'team_owner',
    team_manager: 'team_manager',
    team_player: 'team_player',
    team_substitute: 'team_substitute',
  });

  
  module.exports = {
    Tasks,
    Roles,
    VendorRoles,
    AdminRoles,
    TeamRoles
  };
  
