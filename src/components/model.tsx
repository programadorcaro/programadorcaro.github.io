import { useEffect, useRef } from 'react'
import { useAnimations, useGLTF } from '@react-three/drei'
import type { Group } from 'three'
import type { ThreeElements } from '@react-three/fiber'

type GltfResult = {
  nodes: Record<
    string,
    {
      geometry: never
      skeleton?: never
      morphTargetDictionary?: Record<string, number>
      morphTargetInfluences?: number[]
    }
  >
  materials: Record<string, never>
  animations: never[]
}

type ModelProps = ThreeElements['group']

export function Model(props: ModelProps) {
  const group = useRef<Group>(null)
  const { nodes, materials, animations } = useGLTF('/models/hero.glb') as unknown as GltfResult
  const { actions } = useAnimations(animations, group)
  const animationActions = actions as Record<string, { play: () => void; stop: () => void } | null>

  useEffect(() => {
    Object.values(animationActions).forEach((action) => action?.play())

    return () => {
      Object.values(animationActions).forEach((action) => action?.stop())
    }
  }, [animationActions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]} scale={0.27}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sphere_1" position={[-0.39, -23.798, -0.428]} rotation={[0, -Math.PI / 2, 0]} scale={63.296}>
                <mesh name="Object_4" castShadow receiveShadow geometry={nodes.Object_4.geometry} material={materials['Material.002']} />
              </group>
              <group name="Sphere001_3" position={[-1.427, -3.203, -1.037]} rotation={[0.154, -0.885, -0.075]} scale={[47.439, 40.438, 50.615]}>
                <mesh name="Object_6" castShadow receiveShadow geometry={nodes.Object_6.geometry} material={materials.moon} />
              </group>
              <group name="Cylinder_5" position={[0, -0.77, 0]}>
                <mesh name="Object_8" castShadow receiveShadow geometry={nodes.Object_8.geometry} material={materials.moon} />
              </group>
              <group name="greengrass_tuft004_6" position={[-6.339, -3.429, 4.285]} rotation={[0.146, -0.308, 0.144]} scale={[5.016, 3.603, 5.016]}>
                <mesh
                  name="mesh_3"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_3.geometry}
                  material={materials['Material.001']}
                  morphTargetDictionary={nodes.mesh_3.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_3.morphTargetInfluences}
                />
              </group>
              <group name="Cube003_7" position={[-0.85, -0.431, 2.139]} rotation={[-1.871, 0.696, 2.127]} scale={[0.823, 0.723, 0.736]}>
                <mesh name="Object_12" castShadow receiveShadow geometry={nodes.Object_12.geometry} material={materials.moon} />
              </group>
              <group name="Cube017_8" position={[1.193, -2.282, -5.316]} rotation={[2.036, -1.222, 2.649]} scale={[3.25, 4.22, 3.257]}>
                <mesh name="Object_14" castShadow receiveShadow geometry={nodes.Object_14.geometry} material={materials.moon} />
              </group>
              <group name="Cube018_9" position={[1.774, -1.462, -3.419]} rotation={[0.312, -0.184, 0.319]} scale={[2.372, 2.356, 1.543]}>
                <mesh name="Object_16" castShadow receiveShadow geometry={nodes.Object_16.geometry} material={materials.moon} />
              </group>
              <group name="Cube019_10" position={[-12.598, -2.752, -1.584]} rotation={[0.726, 0.821, -0.149]} scale={[2.372, 2.356, 1.543]}>
                <mesh name="Object_18" castShadow receiveShadow geometry={nodes.Object_18.geometry} material={materials.moon} />
              </group>
              <group name="Cube020_11" position={[-5.324, -0.959, -5.726]} rotation={[0.726, 0.768, -0.172]} scale={[3.76, 3.734, 2.445]}>
                <mesh name="Object_20" castShadow receiveShadow geometry={nodes.Object_20.geometry} material={materials.moon} />
              </group>
              <group name="Cube021_12" position={[-0.922, -0.77, -3.527]} rotation={[0.829, -0.91, 1.139]} scale={[2.372, 2.356, 1.543]}>
                <mesh name="Object_22" castShadow receiveShadow geometry={nodes.Object_22.geometry} material={materials.moon} />
              </group>
              <group name="Cube022_13" position={[-3.816, -0.77, -3.316]} rotation={[2.651, -0.287, -2.864]} scale={[2.372, 2.356, 1.543]}>
                <mesh name="Object_24" castShadow receiveShadow geometry={nodes.Object_24.geometry} material={materials.moon} />
              </group>
              <group name="Cube023_14" position={[2.879, -1.316, -0.864]} rotation={[0.784, -1.285, 1.136]} scale={[1.209, 1.201, 0.786]}>
                <mesh name="Object_26" castShadow receiveShadow geometry={nodes.Object_26.geometry} material={materials.moon} />
              </group>
              <group name="Cube024_15" position={[-6.414, -1.483, 0.438]} rotation={[2.795, -0.738, 2.94]} scale={[1.845, 1.833, 1.2]}>
                <mesh name="Object_28" castShadow receiveShadow geometry={nodes.Object_28.geometry} material={materials.moon} />
              </group>
              <group name="Cube025_16" position={[-3.876, -2.488, 3.977]} rotation={[0.878, -1.029, 0.738]} scale={[2.307, 2.291, 1.5]}>
                <mesh name="Object_30" castShadow receiveShadow geometry={nodes.Object_30.geometry} material={materials.moon} />
              </group>
              <group name="Cube026_17" position={[4, -2.161, 0.987]} rotation={[1.036, -0.992, 0.915]} scale={[2.307, 2.291, 1.5]}>
                <mesh name="Object_32" castShadow receiveShadow geometry={nodes.Object_32.geometry} material={materials.moon} />
              </group>
              <group name="Cube027_18" position={[-11.03, -2.134, -9.053]} rotation={[2.367, 0.868, -2.073]} scale={[5.017, 4.983, 3.263]}>
                <mesh name="Object_34" castShadow receiveShadow geometry={nodes.Object_34.geometry} material={materials.moon} />
              </group>
              <group name="Cube028_19" position={[-10.29, -0.362, -19.863]} rotation={[0.678, -0.398, 0.813]} scale={[5.017, 4.983, 3.263]}>
                <mesh name="Object_36" castShadow receiveShadow geometry={nodes.Object_36.geometry} material={materials.moon} />
              </group>
              <group name="Icosphere_20" position={[-1.272, -0.641, 2.571]} rotation={[0.033, 0.439, 0.135]} scale={[0.631, 0.55, 0.451]}>
                <mesh
                  name="mesh_17"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_17.geometry}
                  material={materials.fire}
                  morphTargetDictionary={nodes.mesh_17.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_17.morphTargetInfluences}
                />
              </group>
              <group name="Cylinder001_21" position={[-0.927, 0.54, 0.123]} rotation={[0.747, 0.559, 0.194]}>
                <mesh name="Object_40" castShadow receiveShadow geometry={nodes.Object_40.geometry} material={materials.moon} />
              </group>
              <group name="Cylinder002_22" position={[-4.239, 1.916, -13.034]}>
                <mesh
                  name="mesh_19"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_19.geometry}
                  material={materials.smoke}
                  morphTargetDictionary={nodes.mesh_19.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_19.morphTargetInfluences}
                />
              </group>
              <group name="Plane_24" position={[-22.772, -25.075, -21.01]} rotation={[0.61, -0.505, -0.988]} scale={37.932}>
                <mesh name="Object_44" castShadow receiveShadow geometry={nodes.Object_44.geometry} material={materials.spaceglow} />
              </group>
              <group name="Armature_93" position={[0, -0.731, 0]}>
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh name="Object_49" geometry={nodes.Object_49.geometry} material={materials.spaceame} skeleton={nodes.Object_49.skeleton} />
                  <skinnedMesh name="Object_50" geometry={nodes.Object_50.geometry} material={materials.outline} skeleton={nodes.Object_50.skeleton} />
                  <skinnedMesh name="Object_52" geometry={nodes.Object_52.geometry} material={materials.spaceame} skeleton={nodes.Object_52.skeleton} />
                  <skinnedMesh name="Object_54" geometry={nodes.Object_54.geometry} material={materials.spaceame} skeleton={nodes.Object_54.skeleton} />
                  <skinnedMesh name="Object_55" geometry={nodes.Object_55.geometry} material={materials.outline} skeleton={nodes.Object_55.skeleton} />
                  <skinnedMesh
                    name="Object_57"
                    geometry={nodes.Object_57.geometry}
                    material={materials.spaceame}
                    skeleton={nodes.Object_57.skeleton}
                    morphTargetDictionary={nodes.Object_57.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_57.morphTargetInfluences}
                  />
                  <skinnedMesh
                    name="Object_59"
                    geometry={nodes.Object_59.geometry}
                    material={materials.spaceame}
                    skeleton={nodes.Object_59.skeleton}
                    morphTargetDictionary={nodes.Object_59.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_59.morphTargetInfluences}
                  />
                  <skinnedMesh name="Object_61" geometry={nodes.Object_61.geometry} material={materials['helmet.002']} skeleton={nodes.Object_61.skeleton} />
                  <skinnedMesh name="Object_63" geometry={nodes.Object_63.geometry} material={materials.spaceame} skeleton={nodes.Object_63.skeleton} />
                  <skinnedMesh name="Object_64" geometry={nodes.Object_64.geometry} material={materials.outline} skeleton={nodes.Object_64.skeleton} />
                  <skinnedMesh name="Object_65" geometry={nodes.Object_65.geometry} material={materials['helmet.002']} skeleton={nodes.Object_65.skeleton} />
                  <skinnedMesh
                    name="Object_67"
                    geometry={nodes.Object_67.geometry}
                    material={materials.spaceameface}
                    skeleton={nodes.Object_67.skeleton}
                    morphTargetDictionary={nodes.Object_67.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_67.morphTargetInfluences}
                  />
                  <skinnedMesh
                    name="Object_69"
                    geometry={nodes.Object_69.geometry}
                    material={materials.outline}
                    skeleton={nodes.Object_69.skeleton}
                    morphTargetDictionary={nodes.Object_69.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_69.morphTargetInfluences}
                  />
                  <skinnedMesh name="Object_71" geometry={nodes.Object_71.geometry} material={materials.spaceame} skeleton={nodes.Object_71.skeleton} />
                  <skinnedMesh name="Object_72" geometry={nodes.Object_72.geometry} material={materials.outline} skeleton={nodes.Object_72.skeleton} />
                  <skinnedMesh name="Object_74" geometry={nodes.Object_74.geometry} material={materials.spaceame} skeleton={nodes.Object_74.skeleton} />
                  <skinnedMesh name="Object_75" geometry={nodes.Object_75.geometry} material={materials.outline} skeleton={nodes.Object_75.skeleton} />
                  <skinnedMesh name="Object_77" geometry={nodes.Object_77.geometry} material={materials.spaceame} skeleton={nodes.Object_77.skeleton} />
                  <skinnedMesh name="Object_78" geometry={nodes.Object_78.geometry} material={materials.outline} skeleton={nodes.Object_78.skeleton} />
                  <skinnedMesh name="Object_80" geometry={nodes.Object_80.geometry} material={materials.spaceame} skeleton={nodes.Object_80.skeleton} />
                  <skinnedMesh name="Object_82" geometry={nodes.Object_82.geometry} material={materials.spaceame} skeleton={nodes.Object_82.skeleton} />
                  <skinnedMesh name="Object_83" geometry={nodes.Object_83.geometry} material={materials.outline} skeleton={nodes.Object_83.skeleton} />
                  <skinnedMesh name="Object_85" geometry={nodes.Object_85.geometry} material={materials.spaceame} skeleton={nodes.Object_85.skeleton} />
                  <skinnedMesh name="Object_86" geometry={nodes.Object_86.geometry} material={materials.outline} skeleton={nodes.Object_86.skeleton} />
                  <group name="arms_78" />
                  <group name="backpack_79" />
                  <group name="belt_80" />
                  <group name="brows_81" />
                  <group name="eyes_82" />
                  <group name="glass_83" />
                  <group name="hair_84" />
                  <group name="head_85" />
                  <group name="head001_86" />
                  <group name="helmet_87" />
                  <group name="helmet001_88" />
                  <group name="legs_89" />
                  <group name="neck_90" />
                  <group name="scarf_91" />
                  <group name="torso_92" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

