/* Software Architecture Playground Logic */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Data Definitions for 24 Patterns
  const patternsData = [
    {
      id: 'monolithic',
      name: 'Monolithic Architecture',
      category: 'structural',
      icon: 'fa-solid fa-cubes',
      shortDesc: 'A traditional unified software model where all components—UI, business logic, and database access—are self-contained and run within a single process. It is highly cohesive and easy to deploy initially.',
      bestFor: [
        { icon: 'fa-solid fa-seedling', label: 'Startups & MVPs' },
        { icon: 'fa-solid fa-gauge-high', label: 'Low System Latency' },
        { icon: 'fa-solid fa-user-shield', label: 'Simple Deployments' }
      ],
      stats: { simplicity: 9, scalability: 3, faultTolerance: 2, deployability: 7, cost: 9 },
      examples: ['Early Shopify', 'WordPress', 'Basecamp'],
      nodes: [
        { id: 'user', label: 'User Browser', icon: 'fa-solid fa-laptop', x: 10, y: 40, desc: 'Client browser initiating page requests.' },
        { id: 'monolith', label: 'Monolith Core App', icon: 'fa-solid fa-cube', x: 45, y: 35, desc: 'Single runtime process containing UI controllers, business rules, and DB queries.' },
        { id: 'db', label: 'Database', icon: 'fa-solid fa-database', x: 80, y: 40, desc: 'Central SQL datastore holding all system tables.' }
      ],
      connections: [
        { from: 'user', to: 'monolith' },
        { from: 'monolith', to: 'db' }
      ],
      stressTestType: 'monolith-crash'
    },
    {
      id: 'layered',
      name: 'Layered (N-Tier) Architecture',
      category: 'structural',
      icon: 'fa-solid fa-layer-group',
      shortDesc: 'Organizes software into distinct, horizontal layers where each layer has a specific role (Presentation, Business, Data). Components within a layer can only communicate with the layer directly below it.',
      bestFor: [
        { icon: 'fa-solid fa-code-fork', label: 'Separation of Concerns' },
        { icon: 'fa-solid fa-spell-check', label: 'Testability per Layer' },
        { icon: 'fa-solid fa-folder-tree', label: 'Standard Enterprise Apps' }
      ],
      stats: { simplicity: 8, scalability: 5, faultTolerance: 4, deployability: 5, cost: 8 },
      examples: ['Typical ASP.NET WebApps', 'Java EE Enterprise Apps'],
      nodes: [
        { id: 'ui', label: 'Presentation Layer (UI)', icon: 'fa-solid fa-display', x: 45, y: 10, desc: 'Handles user interaction and input validation.' },
        { id: 'biz', label: 'Business Logic Layer', icon: 'fa-solid fa-gears', x: 45, y: 35, desc: 'Executes core calculations, business rules, and validations.' },
        { id: 'data', label: 'Data Access Layer', icon: 'fa-solid fa-database', x: 45, y: 60, desc: 'Executes database queries and ORM mappings.' },
        { id: 'db', label: 'Physical DB', icon: 'fa-solid fa-server', x: 45, y: 82, desc: 'Database engine storing records.' }
      ],
      connections: [
        { from: 'ui', to: 'biz' },
        { from: 'biz', to: 'data' },
        { from: 'data', to: 'db' }
      ],
      stressTestType: 'layered-flow'
    },
    {
      id: 'modular-monolith',
      name: 'Modular Monolith',
      category: 'structural',
      icon: 'fa-solid fa-puzzle-piece',
      shortDesc: 'A variation of monolithic architecture where the codebase is strictly structured into independent, highly encapsulated modules. It runs in a single process but allows easy separation to microservices later.',
      bestFor: [
        { icon: 'fa-solid fa-arrow-progress', label: 'Future-proofing code' },
        { icon: 'fa-solid fa-user-group', label: 'Multi-team development' },
        { icon: 'fa-solid fa-cube', label: 'Single process ease' }
      ],
      stats: { simplicity: 7, scalability: 6, faultTolerance: 3, deployability: 6, cost: 8 },
      examples: ['Shopify (current backend)', 'Klaviyo'],
      nodes: [
        { id: 'gateway', label: 'API Gateway / Routing', icon: 'fa-solid fa-door-open', x: 10, y: 40, desc: 'Accepts external traffic and dispatches it inside the runtime.' },
        { id: 'mod-auth', label: 'Auth Module', icon: 'fa-solid fa-shield', x: 45, y: 15, desc: 'Encapsulated module handling session tokens.' },
        { id: 'mod-order', label: 'Order Module', icon: 'fa-solid fa-cart-shopping', x: 45, y: 40, desc: 'Module processing cart orders.' },
        { id: 'mod-billing', label: 'Billing Module', icon: 'fa-solid fa-credit-card', x: 45, y: 65, desc: 'Module interfacing with payment gateways.' },
        { id: 'db', label: 'Shared Database', icon: 'fa-solid fa-database', x: 80, y: 40, desc: 'Data stores, typically segmented logically by schemas.' }
      ],
      connections: [
        { from: 'gateway', to: 'mod-auth' },
        { from: 'gateway', to: 'mod-order' },
        { from: 'gateway', to: 'mod-billing' },
        { from: 'mod-auth', to: 'db' },
        { from: 'mod-order', to: 'db' },
        { from: 'mod-billing', to: 'db' }
      ],
      stressTestType: 'modular-scale'
    },
    {
      id: 'n-tier',
      name: 'N-Tier Architecture',
      category: 'structural',
      icon: 'fa-solid fa-network-wired',
      shortDesc: 'A distributed layered architecture where the Presentation, Application processing, and Data management functions are physically separated into distinct servers or networks, maximizing enterprise security.',
      bestFor: [
        { icon: 'fa-solid fa-user-shield', label: 'High Security (DMZ)' },
        { icon: 'fa-solid fa-shield-halved', label: 'Network Isolation' },
        { icon: 'fa-solid fa-server', label: 'Independent Scaling' }
      ],
      stats: { simplicity: 6, scalability: 6, faultTolerance: 5, deployability: 4, cost: 6 },
      examples: ['Large Banking Systems', 'Gov Portals'],
      nodes: [
        { id: 'client', label: 'Web Tier (DMZ)', icon: 'fa-solid fa-globe', x: 10, y: 40, desc: 'Exposed servers returning static components and UI.' },
        { id: 'app-server', label: 'Application Tier', icon: 'fa-solid fa-gears', x: 50, y: 40, desc: 'Secure backend application servers executing rules.' },
        { id: 'db-tier', label: 'Data Tier (Private)', icon: 'fa-solid fa-database', x: 90, y: 40, desc: 'Highly secured database tier behind a firewall.' }
      ],
      connections: [
        { from: 'client', to: 'app-server' },
        { from: 'app-server', to: 'db-tier' }
      ],
      stressTestType: 'n-tier-security'
    },
    {
      id: 'mvc',
      name: 'Model-View-Controller (MVC)',
      category: 'structural',
      icon: 'fa-solid fa-diagram-project',
      shortDesc: 'A design pattern that decouples an application into three main components: Model (data/rules), View (UI display), and Controller (input processing logic). Ideal for structuring graphical user interfaces.',
      bestFor: [
        { icon: 'fa-solid fa-shuffle', label: 'Modular UI design' },
        { icon: 'fa-solid fa-users-gear', label: 'Parallel UI/Dev work' },
        { icon: 'fa-solid fa-rotate-right', label: 'Rapid iteration' }
      ],
      stats: { simplicity: 8, scalability: 4, faultTolerance: 3, deployability: 6, cost: 9 },
      examples: ['Ruby on Rails', 'ASP.NET MVC', 'Django'],
      nodes: [
        { id: 'user', label: 'User Action', icon: 'fa-solid fa-hand-pointer', x: 10, y: 40, desc: 'User clicks or types on the interface.' },
        { id: 'controller', label: 'Controller', icon: 'fa-solid fa-gamepad', x: 45, y: 15, desc: 'Interprets inputs and updates the Model state.' },
        { id: 'model', label: 'Model', icon: 'fa-solid fa-database', x: 80, y: 40, desc: 'Holds application state and core data logic.' },
        { id: 'view', label: 'View', icon: 'fa-solid fa-image', x: 45, y: 65, desc: 'Renders the Model state to the screen for the user.' }
      ],
      connections: [
        { from: 'user', to: 'controller' },
        { from: 'controller', to: 'model' },
        { from: 'model', to: 'view' },
        { from: 'view', to: 'user' }
      ],
      stressTestType: 'mvc-cycle'
    },
    {
      id: 'mvvm',
      name: 'Model-View-ViewModel (MVVM)',
      category: 'structural',
      icon: 'fa-solid fa-code-merge',
      shortDesc: 'A structural UI pattern that uses two-way data-binding to sync states between the View (UI) and the ViewModel (presentation logic), completely decoupling testing and design.',
      bestFor: [
        { icon: 'fa-solid fa-link', label: 'Two-Way Data Binding' },
        { icon: 'fa-solid fa-terminal', label: 'Independent UI Testing' },
        { icon: 'fa-solid fa-mobile', label: 'SPA / Mobile Interfaces' }
      ],
      stats: { simplicity: 7, scalability: 5, faultTolerance: 4, deployability: 6, cost: 8 },
      examples: ['WPF Applications', 'Angular / Vue.js', 'KnockoutJS'],
      nodes: [
        { id: 'view', label: 'View (UI)', icon: 'fa-solid fa-display', x: 15, y: 40, desc: 'UI markup with data-binding placeholders.' },
        { id: 'viewmodel', label: 'ViewModel', icon: 'fa-solid fa-rotate', x: 50, y: 40, desc: 'Exposes state properties; acts as data binder.' },
        { id: 'model', label: 'Model (Data)', icon: 'fa-solid fa-database', x: 85, y: 40, desc: 'Core data entities and business rules.' }
      ],
      connections: [
        { from: 'view', to: 'viewmodel' },
        { from: 'viewmodel', to: 'view' },
        { from: 'viewmodel', to: 'model' }
      ],
      stressTestType: 'mvvm-sync'
    },
    {
      id: 'mvp',
      name: 'Model-View-Presenter (MVP)',
      category: 'structural',
      icon: 'fa-solid fa-arrows-split-up-and-left',
      shortDesc: 'A derivation of MVC where the Presenter acts as an intermediary between the View and Model, instructing the View exactly how to render via a strict mockable interface.',
      bestFor: [
        { icon: 'fa-solid fa-microscope', label: 'Maximum Unit Testability' },
        { icon: 'fa-solid fa-table-list', label: 'Simple View Layer' },
        { icon: 'fa-solid fa-tablet-screen-button', label: 'Legacy Mobile Dev (Android)' }
      ],
      stats: { simplicity: 7, scalability: 4, faultTolerance: 3, deployability: 5, cost: 8 },
      examples: ['Early ASP.NET WebForms', 'Legacy Android SDK Apps'],
      nodes: [
        { id: 'view', label: 'View (Passive)', icon: 'fa-solid fa-mobile-screen', x: 15, y: 40, desc: 'Fires user events and does what the Presenter commands.' },
        { id: 'presenter', label: 'Presenter', icon: 'fa-solid fa-chalkboard-user', x: 50, y: 40, desc: 'Reads data from Model, formats it, and calls View methods.' },
        { id: 'model', label: 'Model', icon: 'fa-solid fa-folder', x: 85, y: 40, desc: 'Business rules and repository operations.' }
      ],
      connections: [
        { from: 'view', to: 'presenter' },
        { from: 'presenter', to: 'view' },
        { from: 'presenter', to: 'model' }
      ],
      stressTestType: 'mvp-flow'
    },
    {
      id: 'client-server',
      name: 'Client-Server Architecture',
      category: 'distributed',
      icon: 'fa-solid fa-cloud-arrow-up',
      shortDesc: 'A distributed system structure splitting workloads between service requesters (clients) and service providers (centralized servers). It establishes clear division of work.',
      bestFor: [
        { icon: 'fa-solid fa-circle-nodes', label: 'Centralized Control' },
        { icon: 'fa-solid fa-universal-access', label: 'Resource Sharing' },
        { icon: 'fa-solid fa-globe', label: 'Web Applications' }
      ],
      stats: { simplicity: 8, scalability: 6, faultTolerance: 4, deployability: 7, cost: 8 },
      examples: ['Email Clients', 'Websites', 'Database Engines'],
      nodes: [
        { id: 'c1', label: 'Client A', icon: 'fa-solid fa-mobile', x: 15, y: 15, desc: 'Mobile app sending REST API request.' },
        { id: 'c2', label: 'Client B', icon: 'fa-solid fa-laptop', x: 15, y: 65, desc: 'Web browser querying information.' },
        { id: 'server', label: 'Central Server', icon: 'fa-solid fa-server', x: 55, y: 40, desc: 'High-performance application server processing queues.' },
        { id: 'db', label: 'Database', icon: 'fa-solid fa-database', x: 85, y: 40, desc: 'Central database engine storing global data.' }
      ],
      connections: [
        { from: 'c1', to: 'server' },
        { from: 'c2', to: 'server' },
        { from: 'server', to: 'db' }
      ],
      stressTestType: 'clients-burst'
    },
    {
      id: 'microservices',
      name: 'Microservices',
      category: 'distributed',
      icon: 'fa-solid fa-boxes-stacked',
      shortDesc: 'Decomposes an application into a collection of small, independent, loosely coupled services. Each service represents a distinct business function and database, scaling independently.',
      bestFor: [
        { icon: 'fa-solid fa-up-right-and-down-left-from-center', label: 'Massive Scalability' },
        { icon: 'fa-solid fa-people-group', label: 'Large Dev Organizations' },
        { icon: 'fa-solid fa-arrows-spin', label: 'Independent Releases' }
      ],
      stats: { simplicity: 2, scalability: 10, faultTolerance: 8, deployability: 9, cost: 4 },
      examples: ['Netflix', 'Amazon', 'Uber'],
      nodes: [
        { id: 'gateway', label: 'API Gateway', icon: 'fa-solid fa-door-closed', x: 15, y: 40, desc: 'Single entry point routing requests to specific modules.' },
        { id: 'auth', label: 'Auth Service', icon: 'fa-solid fa-user-lock', x: 50, y: 15, desc: 'Handles sessions and user details (isolated DB).' },
        { id: 'order', label: 'Order Service', icon: 'fa-solid fa-basket-shopping', x: 50, y: 40, desc: 'Handles checkouts and carts (isolated DB).' },
        { id: 'inventory', label: 'Inventory Service', icon: 'fa-solid fa-warehouse', x: 50, y: 65, desc: 'Tracks stocks and warehouses (isolated DB).' },
        { id: 'db', label: 'Distributed Data', icon: 'fa-solid fa-network-wired', x: 85, y: 40, desc: 'Separate database instance per microservice.' }
      ],
      connections: [
        { from: 'gateway', to: 'auth' },
        { from: 'gateway', to: 'order' },
        { from: 'gateway', to: 'inventory' },
        { from: 'auth', to: 'db' },
        { from: 'order', to: 'db' },
        { from: 'inventory', to: 'db' }
      ],
      stressTestType: 'service-isolation'
    },
    {
      id: 'soa',
      name: 'Service-Oriented Architecture (SOA)',
      category: 'distributed',
      icon: 'fa-solid fa-hands-holding-child',
      shortDesc: 'A legacy enterprise pattern that connects separate business applications using an Enterprise Service Bus (ESB) and standard web service contracts (SOAP/XML) for interoperability.',
      bestFor: [
        { icon: 'fa-solid fa-handshake', label: 'Legacy Integration' },
        { icon: 'fa-solid fa-building-columns', label: 'Enterprise Systems' },
        { icon: 'fa-solid fa-shuffle', label: 'System Reusability' }
      ],
      stats: { simplicity: 4, scalability: 6, faultTolerance: 5, deployability: 4, cost: 5 },
      examples: ['IBM WebSphere Ecosystems', 'Oracle Enterprise Deployments'],
      nodes: [
        { id: 'crm', label: 'CRM Application', icon: 'fa-solid fa-users', x: 15, y: 15, desc: 'Customer relations records.' },
        { id: 'erp', label: 'ERP Application', icon: 'fa-solid fa-building', x: 15, y: 65, desc: 'Enterprise resources system.' },
        { id: 'esb', label: 'Enterprise Service Bus', icon: 'fa-solid fa-bus-simple', x: 55, y: 40, desc: 'Global middleware translating protocols and routing messages.' },
        { id: 'billing', label: 'Billing App', icon: 'fa-solid fa-money-bill', x: 90, y: 40, desc: 'Central billing accounting module.' }
      ],
      connections: [
        { from: 'crm', to: 'esb' },
        { from: 'erp', to: 'esb' },
        { from: 'esb', to: 'billing' }
      ],
      stressTestType: 'soa-bus'
    },
    {
      id: 'event-driven',
      name: 'Event-Driven Architecture',
      category: 'distributed',
      icon: 'fa-solid fa-bolt',
      shortDesc: 'A system design composed of event producers, event consumers, and broker systems. Microservices communicate asynchronously by publishing events (e.g. "OrderPlaced"), creating high decoupling.',
      bestFor: [
        { icon: 'fa-solid fa-arrow-trend-up', label: 'Real-time Streams' },
        { icon: 'fa-solid fa-link-slash', label: 'Absolute Decoupling' },
        { icon: 'fa-solid fa-plug', label: 'Extensible Features' }
      ],
      stats: { simplicity: 4, scalability: 9, faultTolerance: 8, deployability: 8, cost: 7 },
      examples: ['Kafka / RabbitMQ Systems', 'Stripe Payments', 'Uber Dispatch'],
      nodes: [
        { id: 'producer', label: 'Event Producer', icon: 'fa-solid fa-keyboard', x: 15, y: 40, desc: 'Fires an action (e.g. "UserSignedUp").' },
        { id: 'broker', label: 'Event Broker', icon: 'fa-solid fa-arrows-spin', x: 50, y: 40, desc: 'Ingests, serializes, and routes events to topics.' },
        { id: 'c1', label: 'Notification Consumer', icon: 'fa-solid fa-envelope', x: 85, y: 15, desc: 'Triggers verification email.' },
        { id: 'c2', label: 'Analytics Consumer', icon: 'fa-solid fa-chart-line', x: 85, y: 65, desc: 'Logs data stream for BI tracking.' }
      ],
      connections: [
        { from: 'producer', to: 'broker' },
        { from: 'broker', to: 'c1' },
        { from: 'broker', to: 'c2' }
      ],
      stressTestType: 'event-storm'
    },
    {
      id: 'event-sourcing',
      name: 'Event Sourcing',
      category: 'decoupled',
      icon: 'fa-solid fa-clock-rotate-left',
      shortDesc: 'Instead of storing the current state of data in a table row, it stores all state changes (events) as a sequential append-only log, allowing you to reconstruct past states perfectly.',
      bestFor: [
        { icon: 'fa-solid fa-list-check', label: 'Audit Compliance' },
        { icon: 'fa-solid fa-history', label: 'Time-Travel Debugging' },
        { icon: 'fa-solid fa-chart-pie', label: 'Complex Aggregations' }
      ],
      stats: { simplicity: 3, scalability: 8, faultTolerance: 7, deployability: 6, cost: 6 },
      examples: ['Financial Ledger Systems', 'Git Version Control', 'LMAX Exchange'],
      nodes: [
        { id: 'command', label: 'State Command', icon: 'fa-solid fa-keyboard', x: 15, y: 40, desc: 'Command request (e.g. "Add $10").' },
        { id: 'event-store', label: 'Append-Only Event Store', icon: 'fa-solid fa-book', x: 50, y: 40, desc: 'Immutable log of events sequentially appended.' },
        { id: 'projector', label: 'State Projector', icon: 'fa-solid fa-calculator', x: 85, y: 40, desc: 'Aggregates historical events to compute current account balance.' }
      ],
      connections: [
        { from: 'command', to: 'event-store' },
        { from: 'event-store', to: 'projector' }
      ],
      stressTestType: 'event-replay'
    },
    {
      id: 'cqrs',
      name: 'CQRS Pattern',
      category: 'decoupled',
      icon: 'fa-solid fa-arrow-right-arrow-left',
      shortDesc: 'Command Query Responsibility Segregation separates read operations (queries) from write operations (commands) into distinct models or databases, optimizing performance and scaling.',
      bestFor: [
        { icon: 'fa-solid fa-bolt', label: 'High Read Speed' },
        { icon: 'fa-solid fa-shield', label: 'Optimized Security' },
        { icon: 'fa-solid fa-arrows-split-up-and-left', label: 'Scale Read/Write separately' }
      ],
      stats: { simplicity: 3, scalability: 9, faultTolerance: 6, deployability: 5, cost: 5 },
      examples: ['E-Commerce Sites', 'Stock Trading Platforms'],
      nodes: [
        { id: 'client', label: 'UI Client', icon: 'fa-solid fa-display', x: 10, y: 40, desc: 'Sends state updates and fetches reports.' },
        { id: 'write-api', label: 'Command API (Write)', icon: 'fa-solid fa-pen-to-square', x: 45, y: 15, desc: 'Executes validations and saves states.' },
        { id: 'read-api', label: 'Query API (Read)', icon: 'fa-solid fa-magnifying-glass', x: 45, y: 65, desc: 'Fetches cached views instantly.' },
        { id: 'write-db', label: 'Write DB', icon: 'fa-solid fa-database', x: 80, y: 15, desc: 'Normalized operational transactional DB.' },
        { id: 'read-db', label: 'Read DB (Read Cache)', icon: 'fa-solid fa-memory', x: 80, y: 65, desc: 'Denormalized indexed DB optimised for queries.' }
      ],
      connections: [
        { from: 'client', to: 'write-api' },
        { from: 'write-api', to: 'write-db' },
        { from: 'write-db', to: 'read-db' },
        { from: 'read-db', to: 'read-api' },
        { from: 'read-api', to: 'client' }
      ],
      stressTestType: 'cqrs-separation'
    },
    {
      id: 'clean',
      name: 'Clean Architecture',
      category: 'decoupled',
      icon: 'fa-solid fa-circle-nodes',
      shortDesc: 'A software design structure promoted by Robert C. Martin. It uses concentric circles to enforce the Dependency Rule: source code dependencies can only point inward toward core business rules.',
      bestFor: [
        { icon: 'fa-solid fa-circle', label: 'Independent of DB/UI' },
        { icon: 'fa-solid fa-vial', label: 'Highly Testable Core' },
        { icon: 'fa-solid fa-recycle', label: 'Interchangeable Frameworks' }
      ],
      stats: { simplicity: 5, scalability: 7, faultTolerance: 5, deployability: 6, cost: 7 },
      examples: ['Enterprise Mobile Apps', 'Framework-independent Backends'],
      nodes: [
        { id: 'entity', label: 'Entities (Domain)', icon: 'fa-solid fa-heart', x: 80, y: 40, desc: 'Core business entities and absolute enterprise rules.' },
        { id: 'usecase', label: 'Use Cases', icon: 'fa-solid fa-gears', x: 50, y: 40, desc: 'App-specific business rules driving workflows.' },
        { id: 'interface', label: 'Controllers / Presenters', icon: 'fa-solid fa-arrows-spin', x: 20, y: 20, desc: 'Translates data from use cases to UI/web formats.' },
        { id: 'infra', label: 'DB / Web / UI Gateways', icon: 'fa-solid fa-globe', x: 20, y: 60, desc: 'External mechanisms (EF Core, React Views).' }
      ],
      connections: [
        { from: 'infra', to: 'interface' },
        { from: 'interface', to: 'usecase' },
        { from: 'usecase', to: 'entity' }
      ],
      stressTestType: 'clean-dependency'
    },
    {
      id: 'onion',
      name: 'Onion Architecture',
      category: 'decoupled',
      icon: 'fa-solid fa-stroopwafel',
      shortDesc: 'Introduced by Jeffrey Palermo, Onion Architecture places the Domain Model at the center, wrapped by Domain Services and Application Services. Infrastructure is placed on the outer edge.',
      bestFor: [
        { icon: 'fa-solid fa-shield-cat', label: 'Domain-centric Code' },
        { icon: 'fa-solid fa-microscope', label: 'High Core Isolation' },
        { icon: 'fa-solid fa-arrows-split-up-and-left', label: 'Decoupled SQL/NoSQL' }
      ],
      stats: { simplicity: 6, scalability: 7, faultTolerance: 6, deployability: 6, cost: 7 },
      examples: ['DDD Web Services', 'Complex Enterprise REST APIs'],
      nodes: [
        { id: 'core', label: 'Domain Core', icon: 'fa-solid fa-crosshairs', x: 80, y: 40, desc: 'State and behaviors of business objects.' },
        { id: 'service', label: 'Domain Services', icon: 'fa-solid fa-puzzle-piece', x: 50, y: 40, desc: 'Interfaces for repository and system processes.' },
        { id: 'infra', label: 'Infrastructure (DB/API)', icon: 'fa-solid fa-server', x: 20, y: 40, desc: 'Concrete file stores, databases, and network adapters.' }
      ],
      connections: [
        { from: 'infra', to: 'service' },
        { from: 'service', to: 'core' }
      ],
      stressTestType: 'onion-dependency'
    },
    {
      id: 'hexagonal',
      name: 'Hexagonal Architecture',
      category: 'decoupled',
      icon: 'fa-solid fa-hexagon-nodes',
      shortDesc: 'Also known as Ports and Adapters, Hexagonal Architecture decouples core application logic from external dependencies (UI, DB) through abstraction boundaries (Ports) and translators (Adapters).',
      bestFor: [
        { icon: 'fa-solid fa-arrows-spin', label: 'Interchangeable APIs' },
        { icon: 'fa-solid fa-microscope', label: 'Mocking DB/UI' },
        { icon: 'fa-solid fa-puzzle-piece', label: 'Clean Extensibility' }
      ],
      stats: { simplicity: 5, scalability: 8, faultTolerance: 6, deployability: 6, cost: 7 },
      examples: ['Netflix Payment Engines', 'Modern NestJS/Spring Microservices'],
      nodes: [
        { id: 'adapter-in', label: 'Primary Adapter (REST)', icon: 'fa-solid fa-link', x: 15, y: 15, desc: 'Triggers entry calls to inside ports.' },
        { id: 'port-in', label: 'Inbound Port (API)', icon: 'fa-solid fa-circle-dot', x: 45, y: 15, desc: 'Exposed interface for incoming operations.' },
        { id: 'core', label: 'Core Application', icon: 'fa-solid fa-heart-pulse', x: 45, y: 45, desc: 'Isolated system containing all domain rules.' },
        { id: 'port-out', label: 'Outbound Port (SPI)', icon: 'fa-solid fa-circle-notch', x: 45, y: 75, desc: 'Interface for database queries or messaging.' },
        { id: 'adapter-out', label: 'Secondary Adapter (SQL)', icon: 'fa-solid fa-database', x: 15, y: 75, desc: 'Concrete class executing queries.' }
      ],
      connections: [
        { from: 'adapter-in', to: 'port-in' },
        { from: 'port-in', to: 'core' },
        { from: 'core', to: 'port-out' },
        { from: 'port-out', to: 'adapter-out' }
      ],
      stressTestType: 'hex-flow'
    },
    {
      id: 'pipe-filter',
      name: 'Pipe and Filter',
      category: 'structural',
      icon: 'fa-solid fa-filter',
      shortDesc: 'Processes a stream of data through a sequential chain of independent executing modules (filters) connected by conduits (pipes), facilitating data transformation pipelines.',
      bestFor: [
        { icon: 'fa-solid fa-gears', label: 'Data Processing Stream' },
        { icon: 'fa-solid fa-recycle', label: 'Reusable filters' },
        { icon: 'fa-solid fa-bars-progress', label: 'Streaming Pipelines' }
      ],
      stats: { simplicity: 8, scalability: 7, faultTolerance: 6, deployability: 7, cost: 8 },
      examples: ['Unix terminal commands', 'Compiler pipelines', 'ETL Analytics platforms'],
      nodes: [
        { id: 'source', label: 'Data Source', icon: 'fa-solid fa-arrow-right-to-bracket', x: 10, y: 40, desc: 'Raw ingestion stream.' },
        { id: 'f1', label: 'Parse Filter', icon: 'fa-solid fa-filter', x: 35, y: 40, desc: 'Validates and cleans input strings.' },
        { id: 'f2', label: 'Enrich Filter', icon: 'fa-solid fa-wand-magic-sparkles', x: 60, y: 40, desc: 'Attaches related reference metadata.' },
        { id: 'sink', label: 'Data Sink', icon: 'fa-solid fa-arrow-right-from-bracket', x: 85, y: 40, desc: 'Writes output to file systems or indexes.' }
      ],
      connections: [
        { from: 'source', to: 'f1' },
        { from: 'f1', to: 'f2' },
        { from: 'f2', to: 'sink' }
      ],
      stressTestType: 'pipe-flow'
    },
    {
      id: 'broker',
      name: 'Broker Architecture',
      category: 'distributed',
      icon: 'fa-solid fa-address-book',
      shortDesc: 'A distributed coordinate-service pattern where client calls are routed, mapped, and executed across remote servers through a central Broker middleware, coordinating messaging.',
      bestFor: [
        { icon: 'fa-solid fa-shuffle', label: 'Service Discovery' },
        { icon: 'fa-solid fa-network-wired', label: 'Decoupled networking' },
        { icon: 'fa-solid fa-server', label: 'Scalable service pools' }
      ],
      stats: { simplicity: 5, scalability: 8, faultTolerance: 6, deployability: 6, cost: 7 },
      examples: ['CORBA', 'Apache ActiveMQ Broker', 'gRPC-Web Proxies'],
      nodes: [
        { id: 'client', label: 'Client App', icon: 'fa-solid fa-display', x: 15, y: 40, desc: 'Dispatches remote procedures requests.' },
        { id: 'broker', label: 'Broker Server', icon: 'fa-solid fa-arrows-left-right', x: 50, y: 40, desc: 'Maps signatures and forwards calls to active services.' },
        { id: 's1', label: 'Search Service', icon: 'fa-solid fa-magnifying-glass', x: 85, y: 15, desc: 'Server handling index searches.' },
        { id: 's2', label: 'Print Service', icon: 'fa-solid fa-print', x: 85, y: 65, desc: 'Server handling PDF generations.' }
      ],
      connections: [
        { from: 'client', to: 'broker' },
        { from: 'broker', to: 's1' },
        { from: 'broker', to: 's2' }
      ],
      stressTestType: 'broker-routing'
    },
    {
      id: 'blackboard',
      name: 'Blackboard Architecture',
      category: 'decoupled',
      icon: 'fa-solid fa-chalkboard',
      shortDesc: 'An AI-inspired pattern where independent specialist modules (knowledge sources) read and update a shared repository (blackboard) to solve complex problems iteratively.',
      bestFor: [
        { icon: 'fa-solid fa-brain', label: 'Heuristic AI Solvers' },
        { icon: 'fa-solid fa-object-group', label: 'No Deterministic Route' },
        { icon: 'fa-solid fa-shapes', label: 'Voice/Speech recognition' }
      ],
      stats: { simplicity: 3, scalability: 5, faultTolerance: 6, deployability: 5, cost: 6 },
      examples: ['Speech Recognition tools', 'Sonar Data Interpretation', 'Compiler optimization stages'],
      nodes: [
        { id: 'blackboard', label: 'Shared Blackboard', icon: 'fa-solid fa-chalkboard', x: 50, y: 40, desc: 'Global repository holding the current state of problem solving.' },
        { id: 'agent-parse', label: 'Lexical Agent', icon: 'fa-solid fa-spell-check', x: 15, y: 15, desc: 'Knowledge agent extracting syllables.' },
        { id: 'agent-semantic', label: 'Semantic Agent', icon: 'fa-solid fa-brain', x: 50, y: 10, desc: 'Knowledge agent scoring word contexts.' },
        { id: 'agent-acoustic', label: 'Acoustic Agent', icon: 'fa-solid fa-ear-listen', x: 85, y: 15, desc: 'Knowledge agent processing sound frequencies.' },
        { id: 'control', label: 'Controller', icon: 'fa-solid fa-users-gear', x: 50, y: 75, desc: 'Triggers agents based on blackboard updates.' }
      ],
      connections: [
        { from: 'agent-parse', to: 'blackboard' },
        { from: 'agent-semantic', to: 'blackboard' },
        { from: 'agent-acoustic', to: 'blackboard' },
        { from: 'blackboard', to: 'control' }
      ],
      stressTestType: 'blackboard-loop'
    },
    {
      id: 'space-based',
      name: 'Space-Based Architecture',
      category: 'distributed',
      icon: 'fa-solid fa-rocket',
      shortDesc: 'Eliminates database bottlenecks by executing workloads entirely inside memory using replicated tuples and processing units. Ideal for platforms with extreme, unpredictable traffic spikes.',
      bestFor: [
        { icon: 'fa-solid fa-arrow-up-right-dots', label: 'Extreme Spikes' },
        { icon: 'fa-solid fa-memory', label: 'Zero-Disk Latency' },
        { icon: 'fa-solid fa-shield-heart', label: 'High Availability' }
      ],
      stats: { simplicity: 2, scalability: 10, faultTolerance: 9, deployability: 5, cost: 3 },
      examples: ['Ticketmaster Booking', 'High-Frequency Trading platforms', 'Online auction platforms'],
      nodes: [
        { id: 'request', label: 'User Stream', icon: 'fa-solid fa-arrow-trend-up', x: 10, y: 40, desc: 'Massive incoming booking payload.' },
        { id: 'space-a', label: 'Memory Grid A', icon: 'fa-solid fa-microchip', x: 45, y: 15, desc: 'Virtual memory segment matching tickets.' },
        { id: 'space-b', label: 'Memory Grid B', icon: 'fa-solid fa-microchip', x: 45, y: 65, desc: 'Virtual memory segment validating orders.' },
        { id: 'sync', label: 'Async DB writer', icon: 'fa-solid fa-floppy-disk', x: 80, y: 40, desc: 'Asynchronously dumps memory state to cold database in background.' }
      ],
      connections: [
        { from: 'request', to: 'space-a' },
        { from: 'request', to: 'space-b' },
        { from: 'space-a', to: 'sync' },
        { from: 'space-b', to: 'sync' }
      ],
      stressTestType: 'space-scaling'
    },
    {
      id: 'peer-to-peer',
      name: 'Peer-to-Peer (P2P)',
      category: 'distributed',
      icon: 'fa-solid fa-group-arrows-rotate',
      shortDesc: 'A decentralized network partition where individual nodes (peers) act as both clients and servers to share computing power, storage, or file streams directly without central authority.',
      bestFor: [
        { icon: 'fa-solid fa-shield-virus', label: 'Zero Central Failures' },
        { icon: 'fa-solid fa-cloud-arrow-down', label: 'Direct File Transfers' },
        { icon: 'fa-solid fa-shield-halved', label: 'Censorship Resistance' }
      ],
      stats: { simplicity: 4, scalability: 10, faultTolerance: 9, deployability: 4, cost: 9 },
      examples: ['BitTorrent', 'Bitcoin Blockchain', 'IPFS'],
      nodes: [
        { id: 'n1', label: 'Peer Node A', icon: 'fa-solid fa-laptop-code', x: 20, y: 15, desc: 'User node holding 30% of file.' },
        { id: 'n2', label: 'Peer Node B', icon: 'fa-solid fa-laptop-code', x: 80, y: 15, desc: 'User node holding 50% of file.' },
        { id: 'n3', label: 'Peer Node C', icon: 'fa-solid fa-laptop-code', x: 80, y: 65, desc: 'User node holding 20% of file.' },
        { id: 'n4', label: 'Peer Node D', icon: 'fa-solid fa-laptop-code', x: 20, y: 65, desc: 'Empty user downloading chunks.' }
      ],
      connections: [
        { from: 'n1', to: 'n2' },
        { from: 'n2', to: 'n3' },
        { from: 'n3', to: 'n4' },
        { from: 'n4', to: 'n1' },
        { from: 'n1', to: 'n3' },
        { from: 'n4', to: 'n2' }
      ],
      stressTestType: 'p2p-resilience'
    },
    {
      id: 'plugin',
      name: 'Plugin Architecture',
      category: 'structural',
      icon: 'fa-solid fa-plug',
      shortDesc: 'Also known as Microkernel, this pattern encapsulates basic operations in a core system, while complex features are added dynamically via external plugin modules.',
      bestFor: [
        { icon: 'fa-solid fa-puzzle-piece', label: 'Extensible Software' },
        { icon: 'fa-solid fa-box', label: 'Independent plugin releases' },
        { icon: 'fa-solid fa-laptop-file', label: 'Desktop / IDE tools' }
      ],
      stats: { simplicity: 7, scalability: 5, faultTolerance: 4, deployability: 7, cost: 8 },
      examples: ['VS Code', 'Eclipse IDE', 'Web Browsers (Extensions)'],
      nodes: [
        { id: 'core', label: 'Microkernel Core', icon: 'fa-solid fa-microchip', x: 50, y: 40, desc: 'Core shell handling file systems and settings.' },
        { id: 'p-git', label: 'Git Plugin', icon: 'fa-solid fa-plug', x: 15, y: 15, desc: 'Optional extension adding source control.' },
        { id: 'p-docker', label: 'Docker Plugin', icon: 'fa-solid fa-plug', x: 50, y: 10, desc: 'Optional extension adding container menus.' },
        { id: 'p-linter', label: 'Linter Plugin', icon: 'fa-solid fa-plug', x: 85, y: 15, desc: 'Optional extension adding syntax warnings.' }
      ],
      connections: [
        { from: 'p-git', to: 'core' },
        { from: 'p-docker', to: 'core' },
        { from: 'p-linter', to: 'core' }
      ],
      stressTestType: 'plugin-loading'
    },
    {
      id: 'serverless',
      name: 'Serverless Architecture',
      category: 'distributed',
      icon: 'fa-solid fa-cloud-bolt',
      shortDesc: 'A cloud-hosted application execution model where code runs inside ephemeral containers managed entirely by cloud vendors, scaling from zero to millions of requests seamlessly.',
      bestFor: [
        { icon: 'fa-solid fa-sack-dollar', label: 'Zero Idle Costs' },
        { icon: 'fa-solid fa-arrows-up-down', label: 'Infinite Autoscaling' },
        { icon: 'fa-solid fa-truck-fast', label: 'Ultra-fast Releases' }
      ],
      stats: { simplicity: 7, scalability: 10, faultTolerance: 8, deployability: 9, cost: 7 },
      examples: ['AWS Lambda', 'Google Cloud Functions', 'Vercel Edge Functions'],
      nodes: [
        { id: 'client', label: 'HTTP Client', icon: 'fa-solid fa-laptop', x: 15, y: 40, desc: 'Web client initiating api request.' },
        { id: 'gateway', label: 'API Gateway', icon: 'fa-solid fa-network-wired', x: 45, y: 40, desc: 'Triggers matching function instances dynamically.' },
        { id: 'func', label: 'Lambda Instance', icon: 'fa-solid fa-bolt', x: 75, y: 40, desc: 'Short-lived execution sandbox running Node code.' }
      ],
      connections: [
        { from: 'client', to: 'gateway' },
        { from: 'gateway', to: 'func' }
      ],
      stressTestType: 'serverless-scale'
    },
    {
      id: 'ddd',
      name: 'Domain-Driven Design (DDD)',
      category: 'decoupled',
      icon: 'fa-solid fa-network-wired',
      shortDesc: 'A methodology mapping software structures to complex business domain entities through Bounded Contexts and Ubiquitous Language, preventing cross-module code leakage.',
      bestFor: [
        { icon: 'fa-solid fa-brain', label: 'Highly Complex Rules' },
        { icon: 'fa-solid fa-box-archive', label: 'Domain Boundaries' },
        { icon: 'fa-solid fa-people-group', label: 'Enterprise Alignment' }
      ],
      stats: { simplicity: 2, scalability: 8, faultTolerance: 5, deployability: 6, cost: 5 },
      examples: ['Complex Financial Tech', 'Large Logistics Platforms'],
      nodes: [
        { id: 'cart', label: 'Sales Context', icon: 'fa-solid fa-cart-shopping', x: 25, y: 25, desc: 'Contains ShoppingCart model.' },
        { id: 'inventory', label: 'Stock Context', icon: 'fa-solid fa-warehouse', x: 75, y: 25, desc: 'Contains WarehouseItem model.' },
        { id: 'shared', label: 'Product Catalog', icon: 'fa-solid fa-tags', x: 50, y: 65, desc: 'Shared catalog boundary synced asynchronously.' }
      ],
      connections: [
        { from: 'cart', to: 'shared' },
        { from: 'inventory', to: 'shared' }
      ],
      stressTestType: 'ddd-sync'
    }
  ];

  // 2. DOM Elements
  const patternsGrid = document.getElementById('patterns-grid');
  const hubView = document.getElementById('hub-view');
  const playgroundView = document.getElementById('playground-view');
  const backToHubBtn = document.getElementById('back-to-hub');
  const nextPatternBtn = document.getElementById('next-pattern-btn');
  const playgroundTitle = document.getElementById('playground-title');
  const playgroundCategory = document.getElementById('playground-category');
  const canvasContainer = document.getElementById('canvas-container');
  const svgCanvas = document.getElementById('connections-svg');
  const stressTestBtn = document.getElementById('stress-test-btn');
  const patternDesc = document.getElementById('pattern-desc');
  const bestForList = document.getElementById('best-for-list');
  const examplesBadges = document.getElementById('examples-badges');

  // Stats Bars
  const statSimplicity = document.getElementById('stat-simplicity');
  const statScalability = document.getElementById('stat-scalability');
  const statFault = document.getElementById('stat-fault');
  const statDeployability = document.getElementById('stat-deployability');
  const statCost = document.getElementById('stat-cost');
  const valSimplicity = document.getElementById('val-simplicity');
  const valScalability = document.getElementById('val-scalability');
  const valFault = document.getElementById('val-fault');
  const valDeployability = document.getElementById('val-deployability');
  const valCost = document.getElementById('val-cost');

  // Tooltip
  const tooltip = document.getElementById('component-tooltip');
  const tooltipTitle = document.getElementById('tooltip-title');
  const tooltipDesc = document.getElementById('tooltip-desc');
  const closeTooltip = document.getElementById('close-tooltip');

  let activePattern = null;
  let activeNodes = [];
  let activeConnections = [];

  // Filter Buttons
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCards(btn.getAttribute('data-filter'));
    });
  });

  // 3. Card Renderer
  function renderCards(filter = 'all') {
    patternsGrid.innerHTML = '';
    const filteredPatterns = patternsData.filter(p => filter === 'all' || p.category === filter);
    
    filteredPatterns.forEach(pattern => {
      const card = document.createElement('div');
      card.className = 'glass-card pattern-card';
      card.innerHTML = `
        <div class="pattern-card-icon"><i class="${pattern.icon}"></i></div>
        <h3>${pattern.name}</h3>
        <p class="text-secondary" style="font-size: 0.95rem; line-height: 1.5;">${pattern.shortDesc.split('.')[0]}.</p>
      `;
      card.addEventListener('click', () => loadPlayground(pattern));
      patternsGrid.appendChild(card);
    });
  }

  // Initial render of cards
  renderCards();

  // 4. Load Playground
  function loadPlayground(pattern) {
    activePattern = pattern;
    hubView.style.display = 'none';
    playgroundView.style.display = 'block';
    
    // Clear canvas
    const nodes = canvasContainer.querySelectorAll('.node');
    nodes.forEach(n => n.remove());
    tooltip.style.display = 'none';
    
    // Header Details
    playgroundTitle.textContent = pattern.name;
    playgroundCategory.textContent = pattern.category.charAt(0).toUpperCase() + pattern.category.slice(1);
    patternDesc.textContent = pattern.shortDesc;
    
    // Best For Section
    bestForList.innerHTML = '';
    pattern.bestFor.forEach(item => {
      const el = document.createElement('div');
      el.className = 'best-for-item';
      el.innerHTML = `<i class="${item.icon}"></i><span>${item.label}</span>`;
      bestForList.appendChild(el);
    });
    
    // Trade-off Stats
    updateStat(statSimplicity, valSimplicity, pattern.stats.simplicity);
    updateStat(statScalability, valScalability, pattern.stats.scalability);
    updateStat(statFault, valFault, pattern.stats.faultTolerance);
    updateStat(statDeployability, valDeployability, pattern.stats.deployability);
    updateStat(statCost, valCost, pattern.stats.cost);
    
    // Examples Section
    examplesBadges.innerHTML = '';
    pattern.examples.forEach(item => {
      const el = document.createElement('span');
      el.className = 'example-badge';
      el.textContent = item;
      examplesBadges.appendChild(el);
    });
    
    // Generate SVG path templates and Markers
    activeNodes = [];
    activeConnections = [];
    
    // Render Nodes on Canvas
    pattern.nodes.forEach(nodeData => {
      const nodeEl = document.createElement('div');
      nodeEl.className = 'node';
      nodeEl.id = `node-${nodeData.id}`;
      // Map coordinates to safe areas (5% - 77% for X, 5% - 80% for Y) to prevent container overflow
      const safeX = 5 + (nodeData.x / 100) * 72;
      const safeY = 5 + (nodeData.y / 100) * 75;
      nodeEl.style.left = `${safeX}%`;
      nodeEl.style.top = `${safeY}%`;
      nodeEl.innerHTML = `<i class="${nodeData.icon}"></i><span>${nodeData.label}</span>`;
      
      // Store node element metadata
      const meta = { ...nodeData, element: nodeEl };
      activeNodes.push(meta);
      canvasContainer.appendChild(nodeEl);
      
      // Node Click details
      nodeEl.addEventListener('click', (e) => {
        e.stopPropagation();
        tooltipTitle.textContent = nodeData.label;
        
        const exampleText = getNodeExample(nodeData.id, nodeData.label);
        tooltipDesc.innerHTML = `
          ${nodeData.desc}
          <div style="margin-top: 1rem; padding-top: 0.75rem; border-top: 1px dashed var(--glass-border); font-size: 0.9rem;">
            <strong style="color: var(--accent-primary);"><i class="fa-solid fa-lightbulb"></i> Real-World Tech Example:</strong> ${exampleText}
          </div>
        `;
        
        tooltip.style.display = 'block';
      });
      
      // Dependency Highlight on Hover
      nodeEl.addEventListener('mouseenter', () => highlightDependencies(nodeData.id));
      nodeEl.addEventListener('mouseleave', clearDependencyHighlight);
      
      // Drag Logic attachment
      makeNodeDraggable(nodeEl, meta);
    });
    
    // Render Connections metadata
    pattern.connections.forEach(conn => {
      activeConnections.push({ ...conn });
    });
    
    // Force redraw of dynamic links after node DOM layout completes
    setTimeout(drawConnections, 50);
  }

  function updateStat(progressBar, valText, val) {
    progressBar.style.width = '0%';
    setTimeout(() => {
      progressBar.style.width = `${val * 10}%`;
      valText.textContent = `${val}/10`;
    }, 100);
  }

  // 5. Dynamic SVG Drawing Logic
  function drawConnections() {
    // Clear old lines
    const paths = svgCanvas.querySelectorAll('.connection-line');
    paths.forEach(p => p.remove());
    
    const containerWidth = canvasContainer.clientWidth;
    const containerHeight = canvasContainer.clientHeight;
    
    activeConnections.forEach(conn => {
      const nodeFrom = activeNodes.find(n => n.id === conn.from);
      const nodeTo = activeNodes.find(n => n.id === conn.to);
      
      if (!nodeFrom || !nodeTo) return;
      
      // Calculate coordinates relative to canvas center-points
      const fromX = nodeFrom.element.offsetLeft + nodeFrom.element.offsetWidth / 2;
      const fromY = nodeFrom.element.offsetTop + nodeFrom.element.offsetHeight / 2;
      const toX = nodeTo.element.offsetLeft + nodeTo.element.offsetWidth / 2;
      const toY = nodeTo.element.offsetTop + nodeTo.element.offsetHeight / 2;
      
      // Draw straight SVG lines
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', `M ${fromX} ${fromY} L ${toX} ${toY}`);
      path.setAttribute('class', 'connection-line flowing');
      path.setAttribute('marker-end', 'url(#arrow)');
      path.id = `link-${conn.from}-${conn.to}`;
      
      // Check if this connection was active or stressed previously to restore classes
      if (conn.active) {
        path.classList.add('active');
        path.setAttribute('marker-end', 'url(#arrow-active)');
      }
      if (conn.stressClass) {
        path.classList.add(conn.stressClass);
      }
      
      svgCanvas.appendChild(path);
    });
  }

  // 6. Drag and Drop Mechanics
  function makeNodeDraggable(el, meta) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    
    el.addEventListener('mousedown', dragMouseDown);
    el.addEventListener('touchstart', dragMouseDown, { passive: true });
    
    function dragMouseDown(e) {
      const isTouch = e.type === 'touchstart';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      pos3 = clientX;
      pos4 = clientY;
      
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('touchend', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('touchmove', elementDrag, { passive: false });
    }
    
    function elementDrag(e) {
      if (e.type === 'touchmove') e.preventDefault(); // prevent scrolling while dragging
      
      const isTouch = e.type === 'touchmove';
      const clientX = isTouch ? e.touches[0].clientX : e.clientX;
      const clientY = isTouch ? e.touches[0].clientY : e.clientY;
      
      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;
      
      // Set new coordinates relative to canvas boundary
      let newTop = el.offsetTop - pos2;
      let newLeft = el.offsetLeft - pos1;
      
      const maxLeft = canvasContainer.clientWidth - el.offsetWidth;
      const maxTop = canvasContainer.clientHeight - el.offsetHeight;
      
      // Clamp coordinates inside the canvas wrapper
      newLeft = Math.max(0, Math.min(newLeft, maxLeft));
      newTop = Math.max(0, Math.min(newTop, maxTop));
      
      el.style.left = `${newLeft}px`;
      el.style.top = `${newTop}px`;
      
      // Redraw connecting SVG wires
      drawConnections();
    }
    
    function closeDragElement() {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('touchend', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('touchmove', elementDrag);
    }
  }

  // 7. Dependency Hover Mapper
  function highlightDependencies(nodeId) {
    canvasContainer.classList.add('hover-active');
    
    // Find all directly connected nodes
    const connectedNodeIds = new Set([nodeId]);
    
    activeConnections.forEach(conn => {
      if (conn.from === nodeId) {
        connectedNodeIds.add(conn.to);
        conn.active = true;
      } else if (conn.to === nodeId) {
        connectedNodeIds.add(conn.from);
        conn.active = true;
      }
    });
    
    // Add highlighting classes to nodes
    activeNodes.forEach(node => {
      if (connectedNodeIds.has(node.id)) {
        node.element.classList.add('active-dependency');
      }
    });
    
    drawConnections();
  }

  function clearDependencyHighlight() {
    canvasContainer.classList.remove('hover-active');
    activeNodes.forEach(node => {
      node.element.classList.remove('active-dependency');
    });
    activeConnections.forEach(conn => {
      conn.active = false;
    });
    drawConnections();
  }

  // 8. Tooltip closer
  closeTooltip.addEventListener('click', () => {
    tooltip.style.display = 'none';
  });
  
  backToHubBtn.addEventListener('click', () => {
    playgroundView.style.display = 'none';
    hubView.style.display = 'block';
    activePattern = null;
  });

  nextPatternBtn.addEventListener('click', () => {
    if (!activePattern) return;
    const currentIndex = patternsData.findIndex(p => p.id === activePattern.id);
    const nextIndex = (currentIndex + 1) % patternsData.length;
    loadPlayground(patternsData[nextIndex]);
  });

  // 9. Stress Testing Simulation Engine
  stressTestBtn.addEventListener('click', () => {
    if (!activePattern) return;
    
    // Disable button briefly to prevent double trigger
    stressTestBtn.disabled = true;
    stressTestBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin" style="margin-right: 5px;"></i> Simulating...`;
    
    runStressTest(activePattern.stressTestType);
  });
  
  function runStressTest(type) {
    switch (type) {
      case 'monolith-crash':
        // Stage 1: Speed up traffic
        setAllLinksStress('stress-burst');
        
        // Stage 2: Monolith Core starts shaking and failure
        setTimeout(() => {
          const monolith = document.getElementById('node-monolith');
          if (monolith) {
            monolith.classList.add('node-down');
            monolith.querySelector('span').textContent = '502 Bad Gateway!';
          }
          setAllLinksStress('stress-fail');
        }, 1500);
        
        // Stage 3: Reset
        setTimeout(() => {
          resetStressTestState();
        }, 5000);
        break;

      case 'service-isolation':
        // Stage 1: Load spike to Orders Service
        setLinkStress('gateway', 'order', 'stress-burst');
        setLinkStress('order', 'db', 'stress-burst');
        
        // Stage 2: Orders Service crashes (turns red, shakes), but auth and inventory stay green!
        setTimeout(() => {
          const orderNode = document.getElementById('node-order');
          if (orderNode) {
            orderNode.classList.add('node-down');
            orderNode.querySelector('span').textContent = 'Orders (Failed!)';
          }
          setLinkStress('gateway', 'order', 'stress-fail');
          setLinkStress('order', 'db', 'stress-fail');
        }, 1500);
        
        // Stage 3: Reset
        setTimeout(() => {
          resetStressTestState();
        }, 5500);
        break;

      case 'serverless-scale':
        // Stage 1: Ingest massive burst
        setLinkStress('client', 'gateway', 'stress-burst');
        
        // Stage 2: Ephemeral Instances spin up
        setTimeout(() => {
          for (let i = 1; i <= 3; i++) {
            const tempFunc = document.createElement('div');
            tempFunc.className = 'node node-scaled temp-scale-node';
            tempFunc.innerHTML = `<i class="fa-solid fa-bolt"></i><span>Lambda Instance #${i}</span>`;
            tempFunc.style.left = `${70 + i * 2}%`;
            tempFunc.style.top = `${25 + i * 20}%`;
            canvasContainer.appendChild(tempFunc);
            
            // Add temp link
            const fromX = document.getElementById('node-gateway').offsetLeft + 50;
            const fromY = document.getElementById('node-gateway').offsetTop + 20;
            const toX = 70 + i * 2;
            const toY = 25 + i * 20;
            
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', `M ${fromX} ${fromY} L ${containerCoord(toX, 'w')} ${containerCoord(toY, 'h')}`);
            path.setAttribute('class', 'connection-line flowing stress-burst temp-scale-link');
            path.setAttribute('marker-end', 'url(#arrow)');
            svgCanvas.appendChild(path);
          }
          setLinkStress('gateway', 'func', 'stress-burst');
          const originalFunc = document.getElementById('node-func');
          if (originalFunc) originalFunc.classList.add('node-scaled');
        }, 1200);
        
        // Stage 3: Reset / Scale back to zero
        setTimeout(() => {
          const temps = canvasContainer.querySelectorAll('.temp-scale-node');
          temps.forEach(t => t.remove());
          const tempLinks = svgCanvas.querySelectorAll('.temp-scale-link');
          tempLinks.forEach(l => l.remove());
          resetStressTestState();
        }, 5000);
        break;

      case 'event-storm':
        // Event-driven storm: fast, distributed message packets
        setAllLinksStress('stress-burst');
        setTimeout(() => {
          resetStressTestState();
        }, 4000);
        break;

      case 'p2p-resilience':
        // Show file chunks moving, shut down Node B & C, data reroutes dynamically between A & D
        setLinkStress('n1', 'n2', 'stress-burst');
        setLinkStress('n2', 'n3', 'stress-burst');
        setLinkStress('n3', 'n4', 'stress-burst');
        setLinkStress('n4', 'n1', 'stress-burst');
        
        setTimeout(() => {
          const n2 = document.getElementById('node-n2');
          const n3 = document.getElementById('node-n3');
          if (n2) n2.classList.add('node-down');
          if (n3) n3.classList.add('node-down');
          
          // Reroute active connection between A & D directly
          setLinkStress('n1', 'n2', 'stress-fail');
          setLinkStress('n2', 'n3', 'stress-fail');
          setLinkStress('n3', 'n4', 'stress-fail');
          setLinkStress('n1', 'n3', 'stress-fail');
          setLinkStress('n4', 'n2', 'stress-fail');
          
          setLinkStress('n4', 'n1', 'stress-burst');
        }, 1500);
        
        setTimeout(() => {
          resetStressTestState();
        }, 5500);
        break;

      default:
        // Default generic stress: speed up all channels
        setAllLinksStress('stress-burst');
        setTimeout(() => {
          resetStressTestState();
        }, 3500);
        break;
    }
  }
  
  function containerCoord(percent, type) {
    const parent = canvasContainer;
    return type === 'w' ? (percent / 100) * parent.clientWidth : (percent / 100) * parent.clientHeight;
  }
  
  function setLinkStress(from, to, className) {
    const conn = activeConnections.find(c => c.from === from && c.to === to);
    if (conn) {
      conn.stressClass = className;
      const path = document.getElementById(`link-${from}-${to}`);
      if (path) path.classList.add(className);
    }
  }
  
  function setAllLinksStress(className) {
    activeConnections.forEach(conn => {
      conn.stressClass = className;
      const path = document.getElementById(`link-${conn.from}-${conn.to}`);
      if (path) path.classList.add(className);
    });
  }
  
  function resetStressTestState() {
    // Reset buttons
    stressTestBtn.disabled = false;
    stressTestBtn.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="margin-right: 5px;"></i> Stress Test`;
    
    // Reset nodes
    activeNodes.forEach(node => {
      node.element.classList.remove('node-down', 'node-scaled');
      // Restore names
      if (node.id === 'monolith') node.element.querySelector('span').textContent = 'Monolith Core App';
      if (node.id === 'order') node.element.querySelector('span').textContent = 'Order Service';
      if (node.id === 'n2') node.element.querySelector('span').textContent = 'Peer Node B';
      if (node.id === 'n3') node.element.querySelector('span').textContent = 'Peer Node C';
    });
    
    // Reset connection paths classes
    activeConnections.forEach(conn => {
      delete conn.stressClass;
    });
    
    drawConnections();
  }

  function getNodeExample(nodeId, label) {
    const id = nodeId.toLowerCase();
    const lbl = label.toLowerCase();
    
    if (id.includes('db') || id.includes('database') || lbl.includes('database') || lbl.includes('db')) {
      return 'PostgreSQL, MySQL, Oracle Database, or MongoDB.';
    }
    if (id.includes('user') || id.includes('client') || id.includes('browser') || lbl.includes('browser') || lbl.includes('client')) {
      return 'Google Chrome browser, mobile applications (iOS/Android), or HTTP client clients.';
    }
    if (id.includes('gateway') || lbl.includes('gateway')) {
      return 'AWS API Gateway, Kong Gateway, NGINX, or Traefik API Proxy.';
    }
    if (id.includes('broker') || id.includes('queue') || lbl.includes('broker') || lbl.includes('bus') || id.includes('esb')) {
      return 'Apache Kafka, RabbitMQ message brokers, ActiveMQ, or AWS EventBridge.';
    }
    if (id.includes('auth') || lbl.includes('auth')) {
      return 'Auth0, Keycloak OAuth2 servers, JWT session verifier, or AWS Cognito.';
    }
    if (id.includes('func') || id.includes('lambda') || lbl.includes('lambda') || lbl.includes('function')) {
      return 'AWS Lambda Functions, Google Cloud Functions, or Azure Cloud Functions.';
    }
    if (id.includes('cache') || lbl.includes('cache') || id.includes('redis') || lbl.includes('memory')) {
      return 'Redis cache clusters, Memcached, or Hazelcast in-memory grids.';
    }
    if (id.includes('monolith') || lbl.includes('monolith')) {
      return 'A unified Ruby on Rails, Django, or Laravel application process.';
    }
    if (id.includes('ui') || id.includes('view') || lbl.includes('presentation') || lbl.includes('view')) {
      return 'React.js SPA, Angular framework views, Vue.js, or static HTML5 templates.';
    }
    if (lbl.includes('service') || id.includes('service') || id.includes('s1') || id.includes('s2') || id.includes('mod-')) {
      return 'Dockerized Node.js app, Spring Boot Java services, ASP.NET Core, or Go microservices.';
    }
    if (lbl.includes('filter') || id.includes('f1') || id.includes('f2')) {
      return 'Logstash filters, Regex string transformation scripts, or ETL data flow pipelines.';
    }
    if (lbl.includes('agent') || id.includes('agent')) {
      return 'Speech-to-text translators, semantic classifiers, or custom AI script agents.';
    }
    
    return 'Standard application layer components (e.g., C# classes, Java interfaces, or Node helper functions).';
  }

});
