function fn() {
    //Read base configurations
    var config = karate.call('classpath:gw/gtapi/util/testsconfig/gw-config-utils.js');

    config.policyDataContainer = Java.type('pc.PolicyDataContainer');
    config.policyUtil= Java.type('pc.PolicyUtil')

    //Configure AUT URLs
    config.ccBaseUrl = java.lang.System.getenv('ccBaseUrl') ? java.lang.System.getenv('ccBaseUrl') : 'DEFAULT_CC_URL';
    config.pcBaseUrl = java.lang.System.getenv('pcBaseUrl') ? java.lang.System.getenv('pcBaseUrl') : 'DEFAULT_PC_URL';

    //AUT Instance Healthcheck - set to true to enable
    appHealthCheck(config.ccBaseUrl, false);
    appHealthCheck(config.pcBaseUrl, false);

    //Set Basic Auth Header credentials
    config.credentialsUtil.setCredentialsForAuthHeader('su','gw');

    return config;
}