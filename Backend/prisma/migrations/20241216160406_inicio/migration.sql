-- CreateTable
CREATE TABLE `Roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `Roles_nombre_key`(`nombre`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sedes` (
    `id_sede` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(30) NOT NULL,

    UNIQUE INDEX `Sedes_nombre_key`(`nombre`),
    PRIMARY KEY (`id_sede`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Medicamentos` (
    `id_medicamentos` INTEGER NOT NULL AUTO_INCREMENT,
    `laboratorio` VARCHAR(300) NOT NULL,
    `tipo_producto` VARCHAR(200) NOT NULL,
    `nombre_generico` VARCHAR(191) NOT NULL,
    `nombre_comercial` VARCHAR(191) NOT NULL,
    `fecha_vencimiento` DATETIME(3) NOT NULL,
    `cum` VARCHAR(100) NOT NULL,
    `lote` VARCHAR(191) NOT NULL,
    `codigo` INTEGER NOT NULL,
    `cobertura` VARCHAR(45) NOT NULL,

    PRIMARY KEY (`id_medicamentos`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pacientes` (
    `id_pacientes` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` VARCHAR(191) NOT NULL,
    `tipo_identificacion` VARCHAR(191) NOT NULL,
    `nombre` VARCHAR(191) NOT NULL,
    `telefono1` VARCHAR(10) NOT NULL,
    `telefono2` VARCHAR(10) NOT NULL,
    `eps` VARCHAR(80) NOT NULL,

    UNIQUE INDEX `Pacientes_identificacion_key`(`identificacion`),
    PRIMARY KEY (`id_pacientes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Diagnostico` (
    `id_diagnostico` INTEGER NOT NULL AUTO_INCREMENT,
    `codigo` VARCHAR(45) NOT NULL,
    `descripcion` VARCHAR(500) NOT NULL,
    `paciente_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_diagnostico`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pendientes` (
    `id_pendientes` INTEGER NOT NULL AUTO_INCREMENT,
    `numero_factura` INTEGER NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL,
    `paciente_id` VARCHAR(191) NOT NULL,
    `medicamento_id` INTEGER NOT NULL,
    `diagnostico_id` INTEGER NULL,
    `cantidad_prescrita` INTEGER NOT NULL,
    `cantidad_pendiente` INTEGER NOT NULL,
    `cantidad_entregada` INTEGER NOT NULL,
    `tipo_entrega` VARCHAR(45) NOT NULL,
    `estado_dispensacion` ENUM('pendiente', 'en_proceso', 'completada') NOT NULL DEFAULT 'pendiente',
    `numero_formula` VARCHAR(45) NOT NULL,
    `fecha_formula` DATETIME(3) NOT NULL,
    `observacion` VARCHAR(900) NOT NULL,
    `creado_por` INTEGER NOT NULL,

    INDEX `Pendientes_creado_por_idx`(`creado_por`),
    PRIMARY KEY (`id_pendientes`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entregados` (
    `id_entregados` INTEGER NOT NULL AUTO_INCREMENT,
    `observacion` VARCHAR(990) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL,
    `medicamento_id` INTEGER NOT NULL,
    `cantidad_dispensada` INTEGER NOT NULL,
    `numero_del_entregado` INTEGER NOT NULL,
    `paciente_id` VARCHAR(191) NOT NULL,
    `registrado_por` INTEGER NOT NULL,

    INDEX `Entregados_registrado_por_idx`(`registrado_por`),
    PRIMARY KEY (`id_entregados`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `id_usuario` INTEGER NOT NULL AUTO_INCREMENT,
    `identificacion` VARCHAR(191) NOT NULL,
    `nombre_completo` VARCHAR(191) NOT NULL,
    `nombre_usuario` VARCHAR(191) NOT NULL,
    `contrasena` VARCHAR(191) NOT NULL,
    `role_nombre` VARCHAR(191) NOT NULL,
    `sede_nombre` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Usuarios_identificacion_key`(`identificacion`),
    UNIQUE INDEX `Usuarios_nombre_usuario_key`(`nombre_usuario`),
    PRIMARY KEY (`id_usuario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Diagnostico` ADD CONSTRAINT `Diagnostico_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `Pacientes`(`identificacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pendientes` ADD CONSTRAINT `Pendientes_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `Pacientes`(`identificacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pendientes` ADD CONSTRAINT `Pendientes_medicamento_id_fkey` FOREIGN KEY (`medicamento_id`) REFERENCES `Medicamentos`(`id_medicamentos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pendientes` ADD CONSTRAINT `Pendientes_diagnostico_id_fkey` FOREIGN KEY (`diagnostico_id`) REFERENCES `Diagnostico`(`id_diagnostico`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pendientes` ADD CONSTRAINT `Pendientes_creado_por_fkey` FOREIGN KEY (`creado_por`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entregados` ADD CONSTRAINT `Entregados_medicamento_id_fkey` FOREIGN KEY (`medicamento_id`) REFERENCES `Medicamentos`(`id_medicamentos`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entregados` ADD CONSTRAINT `Entregados_paciente_id_fkey` FOREIGN KEY (`paciente_id`) REFERENCES `Pacientes`(`identificacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entregados` ADD CONSTRAINT `Entregados_registrado_por_fkey` FOREIGN KEY (`registrado_por`) REFERENCES `Usuarios`(`id_usuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_role_nombre_fkey` FOREIGN KEY (`role_nombre`) REFERENCES `Roles`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Usuarios` ADD CONSTRAINT `Usuarios_sede_nombre_fkey` FOREIGN KEY (`sede_nombre`) REFERENCES `Sedes`(`nombre`) ON DELETE RESTRICT ON UPDATE CASCADE;
