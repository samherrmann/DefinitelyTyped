// Type definitions for Seneca
// Project: http://senecajs.org/
// Definitions by: Sam Herrmann <https://github.com/samherrmann>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/* =================== USAGE ===================

    import senecaModule = require('seneca');
    var seneca = senecaModule();

 =============================================== */

declare module "seneca" {
    	  
    function s(): seneca.ISeneca; 
    export = s;
}


declare module seneca {
    
    interface ISeneca {
            
        /**
         * Invoke an action using an object. The action pattern that matches the object in the most specific manner will be invoked.
         */
        act?<T>(input: any, cb?: IStdCallbackFn<T>): ISeneca;     
        act?<T>(keyvaluepairs: string, object: any, cb?: IStdCallbackFn<T>): ISeneca;
                 
        /**
         * Add a new action to the Seneca instance. The action is triggered when an object matching the pattern 
         * is submitted to Seneca using the act method.
         */
        add?<T>(pattern: IPattern | Object, action: (args: any, done: IStdCallbackFn<T>) => void): ISeneca;
        add?<T>(pattern: IPattern | Object, paramspec: any, action: (args: any, done: IStdCallbackFn<T>) => void): ISeneca;
                      
        /**
         * Calls the role:transport,cmd:client action from the transport plugin.
         */
        client?(options?: any): ISeneca; 
        
        /**
         * Calls the close:name action on all plugins that have registered this action. 
         * You can use this to close database connections after tests complete to ensure the process ends.
         */
        close?(done?: (err: any) => void): void;
        
        /**
         * Returns a reference to a named object. These are provided by some plugins so that you can integrate into other systems 
         * (for example, providing a middleware function for express).
         */
        export?<T>(name: string): T;
        
        /**
         * Calls the role:transport, cmd:listen action from the transport plugin.
         */
        listen?(options?: any): ISeneca;
        
        /**
         * Create a log entry using the Seneca logging system. Use this inside plugins as it handles all the context information 
         * (time, which plugin, etc) for you. Levels are debug, info, warn, error, fatal.
         */
        log?: {
            debug?: ILogFn;
            info?: ILogFn;
            warn?: ILogFn;
            error?: ILogFn;
            fatal?: ILogFn;
        }
        
        /**
         * Create an instance of a data entity. The entity-canon defines the kind of entity to create ('product', 'sys/user', ...), 
         * and the properties (optional) define the values of some of the entity fields.
         */
        make?<T>(entityCanon: string, properties?: T): IEntity<T>;
                
        /**
         * Creates a convenience object that can call actions directly using method calls.
         */
        pin?<T>(pattern: string | any): T;
         
        /**
         * Provide a callback to be executed once all the plugins registered up this point are initialized. 
         * You use this to wait for database connections to establish.
         */
        ready?(cb: (err?: any) => void): ISeneca;
                            
        /**
         * Register a plugin. The plugin will usually add some actions to the Seneca instance. 
         * You can optionally provide some options for the plugin (for example, database connection details).
         */
        use?(name: string, options?: any): ISeneca;
        
    
        // TODO: Currently undocumented methods found in source code:
        // error
        // find          
        // has
        // list         
        // options
        // repl
        // start
        // sub
    }
    
       
    /**
     * Seneca entity object
     */
    interface IEntity<T> {
        id$: number;
        save$: (cb: (err: any, data: IEntity<T>) => void) => void;
        load$: (id: number, cb: (err: any, data: IEntity<T>) => void) => void;
        remove$: (id: number, cb: (err: any) => void) => void;
        list$: (query: Object, cb: (err: any, list: IEntity<T>[]) => void) => void;
    }
    
    
    /**
     * Seneca action pattern
     */
    interface IPattern {
        role: string;
        cmd: string;
    }
        
    
    /**
     * Seneca logging function
     */
    interface ILogFn {
        (...args: any[]): void;
    }
    
    
    /**
     * Standard callback function
     */
    interface IStdCallbackFn<T> {
        (err: any, result: T): void;
    }
}